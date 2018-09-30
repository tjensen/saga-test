import React, {Component} from 'react';


function Thumbnail(props) {
  return (
    <div className="thumbnail">
      {props.url && (
        <img
          style={{
            width: `${props.width}px`,
            height: `${props.height}px`
          }}
          src={props.url}
        />
      )}
    </div>
  );
}

export default Thumbnail;
