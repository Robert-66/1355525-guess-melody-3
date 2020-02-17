import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import questions from './mocks/questions.js';
import settings from './mocks/settings.js';

ReactDOM.render(
    <App
      errorsCount={settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.getElementById(`root`)
);
