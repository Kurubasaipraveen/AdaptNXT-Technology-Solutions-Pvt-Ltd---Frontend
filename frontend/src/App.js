import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Adjust the path as necessary
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='Sidebar'>
          <Sidebar />
        </div>
        <div className="Content">
          <Routes>
            
            <Route path="/" element={<Dashboard />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
