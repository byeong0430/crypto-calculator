import '../scss/application.scss';
import React, { Component } from 'react';
import InfoBox from './components/InfoBox.jsx';

export default class App extends Component {
  componentDidMount() {

    fetch('/api/quadrigacx/current-trading')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
      })

  }
  render() {
    return (
      <div>Hey!</div>
    );
  }
}