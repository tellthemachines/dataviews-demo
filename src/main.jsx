import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@wordpress/components/build-style/style.css'
import '@wordpress/dataviews/build-style/style.css'
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)