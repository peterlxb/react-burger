import React,{ Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';

class ContactData extends Component {
  state = {
    name:'',
    email:'',
    address:{
      street:'',
      postalCode:''
    },
    loading:false
  }

  OrderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({loading:true});
    //alert('keep going!');
    const order = {
      ingredients:this.props.ingredients,
      price: this.props.price,
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
        this.setState({loading:false});
        console.log(this.props);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      })
  }

  render() {

    let form = (
      <form>
        <input className="Input" type="text" name="name" placeholder="Your Name" />
        <input className="Input" type="email" name="email" placeholder="Your Email" />
        <input className="Input" type="text" name="street" placeholder="Your Street" />
        <input className="Input" type="text" name="postal" placeholder="Your Postal" />
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
