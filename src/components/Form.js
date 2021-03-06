import React, {Component} from 'react';


// Based on Implementations listed at https://oembed.com/
const OPTIONS = {
  Flickr: 'https://www.flickr.com/services/oembed/',
  GIPHY: 'https://giphy.com/services/oembed',
  Gfycat: 'https://api.gfycat.com/v1/oembed',
  Reddit: 'https://www.reddit.com/oembed',
  SoundCloud: 'https://soundcloud.com/oembed',
  Twitter: 'https://publish.twitter.com/oembed',
  Youtube: 'http://www.youtube.com/oembed'
};


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceBaseURL: OPTIONS.Youtube,
      resourceURL: ''
    };
  }

  onServiceBaseURLChange(event) {
    this.setState({serviceBaseURL: event.target.value});
  }

  onResourceURLChange(event) {
    this.setState({resourceURL: event.target.value});
  }

  onSubmit() {
    this.props.onSubmit(this.state.serviceBaseURL, this.state.resourceURL);
  }

  render() {
    return (
      <div id="fetch-embed-form">
        <div className="row">
          <label>
            Service:
            <select
              id="service-base-url"
              value={this.state.serviceBaseURL}
              onChange={this.onServiceBaseURLChange.bind(this)}
            >
              {Object.entries(OPTIONS).map(([name, value]) => (
                <option key={name} value={value}>{name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="row">
          <label>
            Resource:
            <input
              type="text"
              id="resource-url"
              placeholder="Resource URL"
              value={this.state.resourceURL}
              onChange={this.onResourceURLChange.bind(this)}
            />
          </label>
        </div>
        <div className="row">
          <button
            type="button"
            id="submit"
            disabled={Boolean(this.props.fetching)}
            onClick={this.onSubmit.bind(this)}
          >Submit</button>
        </div>
        <div className="row">
          <div id="fetch-error">{this.props.fetchError}</div>
        </div>
      </div>
    );
  }
}

export default Form;
