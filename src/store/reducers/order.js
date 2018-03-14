import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS
} from '../actions/index';

const initialState = {
  orders: [],
  loading:false
}

const reducer = (state = initialState, action) {
  case (action.type) {
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id:action.orderId
      };
      return {
        ...state,
        loading:false,
        orders:state.orders.concat(newOrder)
      }
    case PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading:false
      }
    default:
      return state;
  }
}

export default reducer;
