import React from 'react';

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // demo from the video

  let transformedIngredients = Object.keys(props.ingredients) //return arrays ['salad','cheese',...]
    .map(igKey => { //igKey => salad ,cheese ....
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    })
    .reduce((arr,el) => {
      return arr.concat(el);
    },[]);

    if(transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
    };

  // const transformedIngredients = Object.keys(props.ingredients) //return arrays ['salad','cheese',...]
  //   .map((igKey, i)=> { //igKey => salad ,cheese ....
  //     return <BurgerIngredient key={igKey + i} type={igKey}/>;
  //   });

  console.log(transformedIngredients);

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;
