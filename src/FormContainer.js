import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './Form';
import actions from './actions';


function mapStateToProps(state) {
  return {
    fetching: state.fetching,
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
        fetching={this.props.fetching}
        fetchError={this.props.fetchError}
        onSubmit={this.onSubmit.bind(this)}
      />
    );
  }
};

export default connect(mapStateToProps, actions)(FormContainer);
