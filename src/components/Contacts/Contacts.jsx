import React from 'react'

export default function Contacts({contacts, handleDel}) {

  return (
    <div>
        <ul>
          {contacts.map((contact)=>
          <li key={contact.id}>
            {contact.name}
            : 
            {contact.number} <button onClick={()=>handleDel(contact.id)}>
              Delete
              </button></li>)}
        </ul>
    </div>
  )
}


