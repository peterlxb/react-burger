import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders:[],
    loading:true
  }

  componentDidMount() {
    console.log('[Orders.js] componentDidMount')
    axios.get('https://react-my-burger-eveyang.firebaseio.com/orders.json')
      .then(response => {
        //console.log(response.data);
        const fetchData = [];
        for (let key in response.data) {
          fetchData.push({
            ...response.data[key],
            id:key
          })
        }
        console.log(fetchData);
        this.setState({loading:false,orders:fetchData});
      })
      .catch(err => {
        this.setState({loading:false})
        //console.log(this.state.loading);
      })
  }

  render() {

    console.log('[Orders.js] render');

    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    )
  }
}

export default withErrorHandler(Orders,axios);
