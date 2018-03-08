import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  let inputClasses = "InputElement";

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses += " Invalid";
  }
  console.log(props.invalid);
  switch(props.elementType) {
    case ('input'):
      inputElement = <input
                      className={inputClasses}
                      {...props.elementConfig}
                      value={props.value}
                      onChange={props.changed}
                    />
      break;
    case ('textarea'):
      inputElement = <textarea
                      className={inputClasses}
                      {...props.elementConfig}
                      value={props.value}
                      onChange={props.changed}
                     />
      break;
    case ('select'):
        inputElement = <select
                        className={inputClasses}
                        value={props.value}
                        onChange={props.changed}
                       >
                       {props.elementConfig.options.map(option => (
                         <option value={option.value} key={option.value}>
                          {option.displayValue}
                         </option>
                       ))}
                       </select>
        break;
      default:
        inputElement = <textarea
                        className={inputClasses}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                       />
        break;



  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  )
};

export default input;
