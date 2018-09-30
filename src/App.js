import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';

import FormContainer from './containers/FormContainer';
import EmbedDataContainer from './containers/EmbedDataContainer';
import reducers from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Fetch Embed Code</h1>
          <FormContainer/>
          <EmbedDataContainer/>
        </div>
      </Provider>
    );
  }
}

export default App;
