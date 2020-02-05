import React from 'react';
import WelcomeScreen from './welcome-screen';

function App(props) {
  // eslint-disable-next-line react/prop-types
  const {errorsCount} = props;

  return <WelcomeScreen errorsCount={errorsCount} />;
}

export default App;
