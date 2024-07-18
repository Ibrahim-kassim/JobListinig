import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';
import JobDetails from './components/JobDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
