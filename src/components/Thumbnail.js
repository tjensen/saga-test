import React from 'react';


function Thumbnail(props) {
  let style;
  if (props.width !== undefined) {
    style = {...style, width: `${props.width}px`};
  }
  if (props.height !== undefined) {
    style = {...style, height: `${props.height}px`};
  }

  return (
    <div className="thumbnail">
      {props.url && (
        <img
          style={style}
          src={props.url}
        />
      )}
    </div>
  );
}

export default Thumbnail;
