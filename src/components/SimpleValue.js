import React, {Component} from 'react';


function SimpleValue(props) {
  return (
    <input
      className="simple-value"
      id={props.id}
      type="text"
      readOnly
      placeholder="not set"
      value={props.value}
    />
  );
}

export default SimpleValue;
