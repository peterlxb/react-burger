export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const REMOVE_INGREDIENTS = "REMOVE_INGREDIENTS";

export function add_ingredients(ingredientName) {
  return {
    type:ADD_INGREDIENTS,
    ingredientName: ingredientName
  }
}

export function remove_ingredients(ingredientName){
  return {
    type:REMOVE_INGREDIENTS,
    ingredientName: ingredientName
  }
}
