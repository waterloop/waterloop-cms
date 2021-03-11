import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import StyleProvider from './utils/style-provider';
import App from './App';
import state from './state';

ReactDOM.render(
  <React.StrictMode>
    <StyleProvider>
      <Provider store={state}>
        <App />
      </Provider>
    </StyleProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
