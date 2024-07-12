import React from 'react';
import loading from './loading.gif';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="loading-image text-center">
      <img className="loading-image" src={loading} alt="Loading..." />
    </div>
  );
}

export default Spinner;
