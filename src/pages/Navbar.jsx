import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header_style.css";
import logo from "../Assets/Jai_Hind_Store.jpg"

function Navbar() {
  const [search, setSearch] = useState("")
  function handleSubmit(e){
    e.preventDefault()
    setSearch("")
  }

  return (
    <nav className="navbar">
      <div className="brand-logo">
        <div className="logo">Jai Hind Store</div>
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      <form className="search" role="search" action="#" method="get" onSubmit={handleSubmit}>
        <input type="search" name="q" placeholder="Search products" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
        </li>
        <li>
          <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

