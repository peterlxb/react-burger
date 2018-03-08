import React,{ Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';

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
            }
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
            }
          },
          zipCode:{
            elementType:'input',
            elementConfig: {
              type:"text",
              placeholder:"ZipCode"
            },
            value:'',
            validation:{
              required:true
            }
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
            }
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
            }
          },
          deliveryMethod:{
            elementType:'select',
            elementConfig: {
              options:[
                {value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}
              ]
            },
            value:''
          }
      },
      loading:false
    }
    //this.handlerChange = this.handlerChange.bind(this);
  }

  inputChangeHandler = (event,inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedOrderElement = {...updatedOrderForm[inputIdentifier]};
    updatedOrderElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderElement;
    this.setState({orderForm:updatedOrderForm});
  }

  OrderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({loading:true});

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients:this.props.ingredients,
      price: this.props.price,
      orderData:formData,
      ordertime:new Date(),
    }

    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading:false});
        console.log(this.props);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      })
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
            changed={(event) => this.inputChangeHandler(event,formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
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

export default ContactData;
