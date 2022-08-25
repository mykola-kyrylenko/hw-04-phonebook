import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';

import {React, useState, useEffect} from 'react';

function App() {
    const [contacts, setContacts] = useState([
      // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]);
    const [filtered, setFiltered] = useState('');
   
    useEffect(() => {
      const contactsStorage = localStorage.getItem('names');
      const parsedStorage = JSON.parse(contactsStorage);

      if (contactsStorage === null) return;
      if(contactsStorage.length === 0) return;
      
      setContacts(parsedStorage);
    }, []);

 
    const submitForm = ({name, number})=>{    
      if(contacts.some(contact => contact.name === name)){
        alert(`${name} is already in contacts`);
        return;
      };

      const newContact = {
        id: nanoid(),
        name,
        number
      };

      setContacts((prev)=> setContacts([newContact, ...prev]));

      const savedSettings = localStorage.getItem('names');
      const parsedSettings = JSON.parse(savedSettings);
  
      if (parsedSettings === null || parsedSettings.length === 0) {
        localStorage.setItem('names', JSON.stringify([newContact]));
        return;
      }
  
      if (parsedSettings.length !== 0) {
        const array = [newContact, ...parsedSettings];
        localStorage.setItem('names', JSON.stringify(array));
        return;
      }
    };

    const filteredName = (e) => {
      setFiltered(e.target.value);
    };

    const getFilteredContacts = () => {
      if(contacts.length > 0){
        return contacts.filter((contact)=>contact.name.toLowerCase().includes(filtered.toLowerCase()))
      };
    };

    const deleteContact = (id) => {
      const delContact = contacts.filter(contact=>contact.id !== id);

      const savedSettings = localStorage.getItem('names');
      const parsedSettings = JSON.parse(savedSettings);
      if (parsedSettings === null) return;
      if (parsedSettings.length === 0) return;
      const arrayDeleteById = parsedSettings.filter(contact => contact.id !== id);
      const serializedState = JSON.stringify(arrayDeleteById);
      localStorage.setItem('names', serializedState);

      setContacts(delContact);
    };
    
    const contactsItems = getFilteredContacts();


    return (
      <>
      <div>
        <h3>Phonebook</h3>
        <ContactForm onSubmit={submitForm}/>
      </div>

      <div>
        <h3>Contacts</h3>
        <input type="text" name={filtered} onChange={filteredName}/>
        {filtered === ''
        ? 
        <Contacts contacts={contacts} handleDel={deleteContact}/> 
        : 
        <Filter contactsList={contactsItems}/>}
      </div>
      </>
    )
}

export default App;
