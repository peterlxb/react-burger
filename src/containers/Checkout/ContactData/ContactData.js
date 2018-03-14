import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {purchaseBurger} from '../../../store/actions/index';


class ContactData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
          name: {
            elementType:'input',
            elementConfig: {
              type:"text",
              placeholder:"Your Name"
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          street:{
            elementType:'input',
            elementConfig: {
              type:"input",
              placeholder:"Street"
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          zipCode:{
            elementType:'input',
            elementConfig: {
              type:"text",
              placeholder:"ZipCode"
            },
            value:'',
            validation:{
              required:true,
              minLength:5,
              maxLength:5
            },
            valid:false,
            touched:false
          },
          country:{
            elementType:'input',
            elementConfig: {
              type:"text",
              placeholder:"Country"
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          email:{
            elementType:'input',
            elementConfig: {
              type:"email",
              placeholder:"Your Email"
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          deliveryMethod:{
            elementType:'select',
            elementConfig: {
              options:[
                {value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}
              ]
            },
            value:'fastest',
            validation:{},
            valid:true
          }
      },
      formIsValid:false
    }
    //this.handlerChange = this.handlerChange.bind(this);
  }

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength ){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength ){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event,inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedOrderElement = {...updatedOrderForm[inputIdentifier]};

    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value,updatedOrderElement.validation);
    updatedOrderElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderElement;
    //console.log(updatedOrderElement);
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
  }

  OrderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ings);

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients:this.props.ings,
      price: this.props.price,
      orderData:formData,
      ordertime:new Date(),
    }

    // axios.post('/orders.json',order)
    //   .then(response => {
    //     this.setState({loading:false});
    //     console.log(this.props);
    //     this.props.history.push('/');
    //   })
    //   .catch(error => {
    //     this.setState({loading:false});
    //   })
    this.props.onOrderBurger(order);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id:key,
        config:this.state.orderForm[key]
      })
    }

    let form = (
      <form>

        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event,formElement.id)}
          />
        ))}
        <Button btnType="Success"
                clicked={this.OrderHandler}
                disabled={!this.state.formIsValid}>
                ORDER
        </Button>
      </form>
    );

    if(this.state.loading) {
      form = <Spinner />
    }

    return(
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price:state.totalPrice,
    loading:state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
