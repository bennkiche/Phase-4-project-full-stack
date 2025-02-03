import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TestsContainer from './Pages/TestsContainer';
import AddTestForm from './Pages/AddTestForm';
import LabsContainer from './Pages/LabsContainer';
import PricesSection from './Pages/PricesSection';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<TestsContainer />} />
        <Route path="/tests/new" element={<AddTestForm />} />
        <Route path="/labs" element={<LabsContainer />} />
        <Route path="/prices" element={<PricesSection />} />
      </Routes>
    </Router>
  );
};

export default App;