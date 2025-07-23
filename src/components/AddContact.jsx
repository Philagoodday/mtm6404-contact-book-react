import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../db';

function AddContact() {
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!contact.firstName || !contact.lastName || !contact.email) {
      alert("fill in all required fields");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'contacts'), contact);
      navigate(`/contact/${docRef.id}`);
    } catch (e) {
      console.error("error: ", e);
      alert("Failed to add contact。");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>add new contact</h2>
      <input name="firstName" placeholder="lastName" onChange={handleChange} />
      <input name="lastName" placeholder="firstName" onChange={handleChange} />
      <input name="email" type="email" placeholder="email (optional)" onChange={handleChange} />
      <input name="phone" placeholder="phone" onChange={handleChange} />
      <input name="address" placeholder="address" onChange={handleChange} />
      <button type="submit">add</button>
    </form>
  );
}

export default AddContact;