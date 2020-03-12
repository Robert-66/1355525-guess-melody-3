import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app';
import questions from './mocks/questions.js';
import settings from './mocks/settings.js';
import {reducer} from './reducer';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        errorsCount={settings.ERRORS_COUNT}
        questions={questions}
      />
    </Provider>,
    document.getElementById(`root`)
);
