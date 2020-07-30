import React from 'react';

import Amplify from 'aws-amplify';
import amplify_config from './amplify-config';

import Routes from './routes';
import './App.css';


Amplify.configure(amplify_config);

function App() {
  return (
    <div className="background-color">
      <Routes/>
    </div>
  );
}

export default App;
