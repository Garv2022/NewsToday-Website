import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" key="general" element={<News pageSize={6} country="in" category="general" />} />
            <Route exact path="/business" key="business" element={<News pageSize={6} country="in" category="business" />} />
            <Route exact path="/entertainment" key="entertainment" element={<News pageSize={6} country="in" category="entertainment" />} />
            <Route exact path="/general" key="general" element={<News pageSize={6} country="in" category="general" />} />
            <Route exact path="/health" key="health" element={<News pageSize={6} country="in" category="health" />} />
            <Route exact path="/science" key="science" element={<News pageSize={6} country="in" category="science" />} />
            <Route exact path="/sports" key="sports" element={<News pageSize={6} country="in" category="sports" />} />
            <Route exact path="/technology" key="technology" element={<News pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
