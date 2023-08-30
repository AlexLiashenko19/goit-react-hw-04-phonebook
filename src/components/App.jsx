import { Form } from 'components/Todos/Form';
import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LOCAL_KEY = 'name';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = contactNew => {
    const { contacts } = this.state;
    const isExist = contacts.find(
      contact => contactNew.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) return alert('enter something');

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactNew],
    }));
  };

  handleFilter = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phone book</h1>
        <Form onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
