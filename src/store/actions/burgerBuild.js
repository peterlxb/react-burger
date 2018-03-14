import {
  ADD_INGREDIENTS,
  REMOVE_INGREDIENTS,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type:ADD_INGREDIENTS,
    ingredientName: ingredientName
  }
}

export const removeIngredient = (ingredientName) => {
  return {
    type:REMOVE_INGREDIENTS,
    ingredientName: ingredientName
  }
}

export const setIngredients = (ingredients) => {
  return {
    type:SET_INGREDIENTS,
    ingredients:ingredients
  }
}

export const fetchIngredientsFalied = () => {
  return {
    type:FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-eveyang.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFalied())
      })
  }
}
