import React, {Component} from 'react';


class RichEmbedData extends Component {
  render() {
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
              value={this.props.html}
            />
          </label>
        </div>
        <div className="row">
          <label className="big">
            Preview:
            <div
              className="embed-preview"
              style={{
                width: `${this.props.width}px`,
                height: `${this.props.height}px`
              }}
              dangerouslySetInnerHTML={{__html: this.props.html}}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default RichEmbedData;
