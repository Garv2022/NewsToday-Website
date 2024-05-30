import React, { Component } from 'react'
import loading from './loading.gif'
import './Spinner.css'

export class Spinner extends Component {
  render() {
    return (
      <div className='loading-image text-center'>
        <img className="loading-image" src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
