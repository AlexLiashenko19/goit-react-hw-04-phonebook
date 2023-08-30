import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Form = ({ onAddContact }) => {
  const [contactInfo, setContactInfo] = useState({ name: '', number: '' });

  const handleInput = e => {
    const { name, value } = e.target;
    setContactInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactsList = {
      name: contactInfo.name,
      number: contactInfo.number,
      id: nanoid(),
    };

    onAddContact(contactsList);
    setContactInfo({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={contactInfo.name}
          onChange={handleInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          value={contactInfo.number}
          onChange={handleInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contacts</button>
    </form>
  );
};

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
