import React from 'react';


function RichEmbedData(props) {
  return (
    <div className="rich-embed-data">
      <div className="row">
        <label className="big">
          Embed Code HTML:
          <textarea
            className="embed-html"
            rows={5}
            cols={80}
            readOnly
            value={props.html}
          />
        </label>
      </div>
      <div className="row">
        <label className="big">
          Preview:
          <div
            className="embed-preview"
            style={{
              width: `${props.width}px`,
              height: `${props.height}px`
            }}
            dangerouslySetInnerHTML={{__html: props.html}}
          />
        </label>
      </div>
    </div>
  );
}

export default RichEmbedData;
