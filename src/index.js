import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import './styles/index.css';
import App from './containers/App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

library.add(faStroopwafel);

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
  );

registerServiceWorker();

