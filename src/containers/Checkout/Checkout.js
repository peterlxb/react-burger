import React,{Component} from 'react';
import { Route,Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

import purchaseInit from '../../store/actions/index';

class Checkout extends Component {

  checkoutCancelledHandler = ()  => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    let summary = <Redirect to="/"/>
    if (this.props.ings) {
      //根据order.purchased判断是不是执行了action.PURCHASE_BURGER_SUCCESS
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

      summary = (
                <div>
                  {purchasedRedirect}
                  <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}
                    />
                  </div>
                );
    }
    return summary
  }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuild.ingredients,
    price:state.burgerBuild.totalPrice,
    purchased:state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
