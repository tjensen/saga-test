import React from 'react';

import SimpleValue from './SimpleValue';
import LinkableName from './LinkableName';
import Thumbnail from './Thumbnail';


function CommonEmbedData(props) {
  return (
    <div id="common-embed-data">
      <div className="row">
        <label>
          Type:
          <SimpleValue
            id="embed-type"
            value={props.type}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Version:
          <SimpleValue
            id="embed-version"
            value={props.version}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Title:
          <SimpleValue
            id="embed-title"
            value={props.title}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Author:
          <LinkableName
            id="embed-author"
            name={props.authorName}
            url={props.authorURL}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Provider:
          <LinkableName
            id="embed-provider"
            name={props.providerName}
            url={props.providerURL}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Cache Age:
          <SimpleValue
            id="embed-cache-age"
            value={props.cacheAge}
          />
        </label>
      </div>
      <div className="row">
        <label className="big">
          Thumbnail:
          <Thumbnail
            id="embed-thumbnail"
            url={props.thumbnailURL}
            width={props.thumbnailWidth}
            height={props.thumbnailHeight}
          />
        </label>
      </div>
    </div>
  );
}

export default CommonEmbedData;
