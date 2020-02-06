import React from 'react';

function WelcomeScreen(props) {
  // eslint-disable-next-line react/prop-types
  const {errorsCount} = props;

  return (
    <>
      <h1>Страница приветствия</h1>
      <p>Количество ошибок: {errorsCount}</p>
    </>
  );
}

export default WelcomeScreen;
