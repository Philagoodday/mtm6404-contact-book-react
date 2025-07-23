import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import './App.css'; 
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1><Link to="/">Contact vook</Link></h1>
          <nav>
            <Link to="/add" className="button-like">add contact</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;