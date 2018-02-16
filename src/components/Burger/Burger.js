import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients) //return arrays ['salad','cheese',...]
    .map(igKey => { //igKey => salad ,cheese ....
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    }) //addition method to avoid emypt []
    .reduce((arr,el) => {
      return arr.concat(el);
    },[]);

    if(transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
    };

  console.log(transformedIngredients);
  // do noe use {} here.
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;
