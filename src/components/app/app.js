import React, { Component } from 'react';
import AutoCompletedText from '../autoCompletedText/autoCompletedText';
import '../../assets/sass/global.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AutoCompletedText />
      </div>
    );
  }
}

export default App;