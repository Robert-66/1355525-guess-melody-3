import React from 'react';
import PropTypes from 'prop-types';

function Errors(props) {
  const {count} = props;

  const errors = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {errors.map((error, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
}

Errors.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Errors;
