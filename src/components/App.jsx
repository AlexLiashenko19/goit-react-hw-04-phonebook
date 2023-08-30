import { Form } from 'components/Todos/Form';
import { useEffect, useState } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem(LOCAL_KEY);
    return JSON.parse(storedContacts) || [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contactNew => {
    const isExist = contacts.find(
      contact => contactNew.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) {
      alert('enter something');
      return;
    }

    setContacts(prevContacts => [...prevContacts, contactNew]);
  };

  const handleFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <h1>Phone book</h1>
      <Form onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};
