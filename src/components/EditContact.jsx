import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../db';

function EditContact() {
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, contact);
    navigate(`/contact/${id}`); 
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Edit comtact</h2>
      <input name="firstName" value={contact.firstName} onChange={handleChange} />
      <input name="lastName" value={contact.lastName} onChange={handleChange} />
      <input name="email" type="email" value={contact.email} onChange={handleChange} />
      <input name="phone" value={contact.phone || ''} placeholder="Phone" onChange={handleChange} />
      <input name="address" value={contact.address || ''} placeholder="Address" onChange={handleChange} />
      <button type="submit">Update Contact</button>
    </form>
  );
}

export default EditContact;