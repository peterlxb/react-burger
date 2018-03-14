import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import {
  addIngredient,removeIngredient,initIngredients
} from '../../store/actions/index';


class BurgerBuilder extends Component {
  constructor(props){
    super(props);
    this.state = {
      purchasable:false,
      purchasing:false,
      loading:false
    }
  }

  componentDidMount() {
    console.log('[BurgerBuilder.js] componentDidMount()');
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum,ele) => {
      return sum + ele;
    },0);
    return sum > 0 ;
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
    this.props.history.push('/checkout');
  }

  render () {
    console.log(this.props.ings);
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // disableInfo => {salad:true, meat:false}....


    let burger = this.props.error ? <p>ingredients cannot be loaded</p> : <Spinner />;
    let orderSummary = null;

    // if(this.state.loading) {
    //   orderSummary = <Spinner />
    // }
    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              price={this.props.price}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
                            ingredients={this.props.ings}
                            price={this.props.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                          />;
    };

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuild.ingredients,
    price:state.burgerBuild.totalPrice,
    error:state.burgerBuild.error,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));
