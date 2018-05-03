/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(<MuiThemeProvider><MainPage/></MuiThemeProvider>, document.getElementById('root'));