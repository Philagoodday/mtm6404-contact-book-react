import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../db';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'contacts'), orderBy('lastName'));
      const contactsSnapshot = await getDocs(q);
      const contactsList = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsList);
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-list">
      <input
        type="text"
        placeholder="Search..."
        className="search-box"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.lastName}, {contact.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;