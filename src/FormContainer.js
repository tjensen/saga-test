import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './Form';
import actions from './actions';


function mapStateToProps(state) {
  return {
    embedHTML: state.embedHTML,
    fetchError: state.fetchError
  }
}

class FormContainer extends Component {
  onSubmit(serviceBaseURL, resourceURL) {
    this.props.setServiceBaseURL(serviceBaseURL);
    this.props.startFetchEmbed(resourceURL);
  }

  render() {
    return (
      <Form
        embedHTML={this.props.embedHTML}
        fetchError={this.props.fetchError}
        onSubmit={this.onSubmit.bind(this)}
      />
    );
  }
};

export default connect(mapStateToProps, actions)(FormContainer);
