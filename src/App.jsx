import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;


