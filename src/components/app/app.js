import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';

const handleWelcomeButtonClick = () => {};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

function App(props) {
  const {errorsCount} = props;

  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      onClickWelcomeButton={handleWelcomeButtonClick}
    />
  );
}

export default App;
