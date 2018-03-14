import {
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL
} from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
  return {
    type:PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json',orderData)
      .then( response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      })
  }
}
