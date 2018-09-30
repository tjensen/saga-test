import React, {Component} from 'react';


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceBaseURL: '',
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
        <input
          type="text"
          id="service-base-url"
          placeholder="Service Base URL"
          value={this.state.serviceBaseURL}
          onChange={this.onServiceBaseURLChange.bind(this)}
        />
        <input
          type="text"
          id="resource-url"
          placeholder="Resource URL"
          value={this.state.resourceURL}
          onChange={this.onResourceURLChange.bind(this)}
        />
        <button type="button" onClick={this.onSubmit.bind(this)}>Submit</button>
        <div id="fetch-error">{this.props.fetchError}</div>
        <textarea
          id="embed-html"
          rows={5}
          cols={80}
          readOnly
          value={this.props.embedHTML}
        />
      </div>
    );
  }
}

export default Form;
