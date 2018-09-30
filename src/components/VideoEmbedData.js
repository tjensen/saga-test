import React, {Component} from 'react';


class VideoEmbedData extends Component {
  render() {
    return (
      <div id="video-embed-data">
        <textarea
          id="embed-html"
          rows={5}
          cols={80}
          readOnly
          value={this.props.html}
        />
        <div
          id="embed-preview"
          style={`width: ${this.props.width}px; height: ${this.props.height}px;`}
          dangerouslySetInnerHTML={{__html: this.props.html}}
        />
      </div>
    );
  }
}

export default VideoEmbedData;
