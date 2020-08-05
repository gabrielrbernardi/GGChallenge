import React from 'react';

import Amplify from 'aws-amplify';
import amplify_config from './amplify-config';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
