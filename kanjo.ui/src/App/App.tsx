import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Helpers/routes';
import Navigation from '../Components/Navbar';

function App(): JSX.Element {
  return (
    <Router>
      <Navigation/>
      <Routes/>
    </Router>  
  );
}

export default App;
