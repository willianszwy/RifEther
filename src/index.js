import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3/dist/web3.min.js'

import './index.css';
import App from './App';

function getLibrary(provider) {
  return new Web3(provider)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App/>} />
      </Routes>
    </BrowserRouter> 
    </Web3ReactProvider>
  </React.StrictMode>
);

