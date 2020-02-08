import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

function App(props) {
  const {errorsCount} = props;

  return <WelcomeScreen errorsCount={errorsCount} />;
}

export default App;
