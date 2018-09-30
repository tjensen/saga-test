import React from 'react';

import LinkableName from './LinkableName';


function PhotoEmbedData(props) {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`
  };

  return (
    <div className="photo-embed-data">
      <div className="row">
        <label>
          URL:
          <LinkableName
            className="embed-url"
            url={props.url}
          />
        </label>
      </div>
      <div className="row">
        <label className="big">
          Preview:
          <div className="embed-preview" style={style}>
            <img style={style} src={props.url}/>
          </div>
        </label>
      </div>
    </div>
  );
}

export default PhotoEmbedData;
