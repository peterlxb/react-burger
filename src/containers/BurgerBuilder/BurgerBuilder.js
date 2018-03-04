import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad:0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredients: {
        salad:0,
        bacon:2,
        cheese: 0,
        meat:0
      },
      totalPrice:4,
      purchasable:false,
      purchasing:false,
      loading:false
    }
  }

  updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum,ele) => {
      return sum + ele;
    },0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;
    this.setState({totalPrice: newPrice,ingredients:updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice,ingredients:updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
    //console.log("modal show");
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
    //console.log("modal show");
  }

  purchaseContinueHandler = () => {
    this.setState({loading:true});
    //alert('keep going!');
    const order = {
      ingredients:this.state.ingredients,
      price: this.state.totalPrice,
      custom: {
        name: 'Peter liu',
        address:{
          street:'Teststreet 1',
          zipCode:'42311',
          country:'China'
        },
        email:'test@test.com'
      },
      deliveryMethod:"fastest",
      ordertime:new Date(),
    }

    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading:false,purchasing:false})
      })
      .catch(error => {
        this.setState({loading:false,purchasing:false});
      })

  }

  render () {

    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // disableInfo => {salad:true, meat:false}....

    let orderSummary = <OrderSummary
                          ingredients={this.state.ingredients}
                          price={this.state.totalPrice}
                          purchaseCancelled={this.purchaseCancelHandler}
                          purchaseContinued={this.purchaseContinueHandler}
                        />

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
        />
      </Aux>
    )
  }
};

export default WithErrorHandler(BurgerBuilder,axios);
