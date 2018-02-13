import React from 'react';

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // demo from the video

  // const transformedIngredients = Object.keys(props.ingredients) //return arrays ['salad','cheese',...]
  //   .map(igKey => { //igKey => salad ,cheese ....
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey}/>;
  //     });
  //   });

  const transformedIngredients = Object.keys(props.ingredients) //return arrays ['salad','cheese',...]
    .map((igKey, i)=> { //igKey => salad ,cheese ....
      return <BurgerIngredient key={props.ingredients[igKey] + i} type={igKey}/>;
    });

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;
