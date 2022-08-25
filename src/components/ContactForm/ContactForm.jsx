import {React, useState} from 'react';

export default function ContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e)=>{
    setName(e.target.value);
  };

  const hamdleNumberChange = (e)=>{
    setNumber(e.target.value)
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name, number });

    resetForm();
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleNameChange}

            />
          </label>

          <label htmlFor="number">
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={hamdleNumberChange}

            />
          </label>

          <button type='submit'>Add contact</button>
        </form>
    </div>
  )
}
