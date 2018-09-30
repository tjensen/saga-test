import React, {Component} from 'react';
import {connect} from 'react-redux';

import CommonEmbedData from '../components/CommonEmbedData';
import RichEmbedData from '../components/RichEmbedData';


function mapStateToProps(state) {
  if (state.embedData) {
    return {
      haveEmbedData: true,
      isRich: state.embedData.type === 'video' || state.embedData.type === 'rich',
      type: state.embedData.type,
      version: state.embedData.version,
      title: state.embedData.title,
      authorName: state.embedData.author_name,
      authorURL: state.embedData.author_url,
      providerName: state.embedData.provider_name,
      providerURL: state.embedData.provider_url,
      cacheAge: state.embedData.cache_age,
      thumbnailURL: state.embedData.thumbnail_url,
      thumbnailWidth: state.embedData.thumbnail_width,
      thumbnailHeight: state.embedData.thumbnail_height,
      html: state.embedData.html,
      width: state.embedData.width,
      height: state.embedData.height
    }
  }
  else {
    return {
      haveEmbedData: false
    }
  }
}

class EmbedDataContainer extends Component {
  render() {
    return (
      <div className="embed-data-container">
        {this.props.haveEmbedData ? (
          <div>
            <CommonEmbedData
              type={this.props.type}
              version={this.props.version}
              title={this.props.title}
              authorName={this.props.authorName}
              authorURL={this.props.authorURL}
              providerName={this.props.providerName}
              providerURL={this.props.providerURL}
              cacheAge={this.props.cacheAge}
              thumbnailURL={this.props.thumbnailURL}
              thumbnailWidth={this.props.thumbnailWidth}
              thumbnailHeight={this.props.thumbnailHeight}
            />
            {this.props.isRich && (
              <RichEmbedData
                html={this.props.html}
                width={this.props.width}
                height={this.props.height}
              />
            )}
          </div>
        ) : 'Click "Submit" button to view an embed'}
      </div>
    );
  }
};

export default connect(mapStateToProps)(EmbedDataContainer);
