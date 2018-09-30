import React, {Component} from 'react';


function LinkableName(props) {
  return (
    <div className="linkable-name">
      {props.url ? (<a href={props.url}>{props.name || props.url}</a>) : props.name}
    </div>
  );
}

export default LinkableName;
