import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../db';

    function ContactDetails() {
        const [contact, setContact] = useState(null);
        const { id } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
         const fetchContact = async () => {
             const docRef = doc(db, 'contacts', id);
         const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");}};
    fetchContact();
  }, [id]); 

  const handleDelete = async () => {
    if (window.confirm("Delete this contact?")) {
      await deleteDoc(doc(db, 'contacts', id));
      navigate('/'); 
    } };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact-details">
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p><strong>email:</strong> {contact.email}</p>
      {}
      {contact.phone && <p><strong>phone:</strong> {contact.phone}</p>}
      {contact.address && <p><strong><address></address>:</strong> {contact.address}</p>}

      <div className="actions">
        <Link to={`/edit/${id}`} className="button-like">edit</Link>
        <button onClick={handleDelete} className="button-like danger">delete</button>
      </div>
    </div>
  );
}

export default ContactDetails;