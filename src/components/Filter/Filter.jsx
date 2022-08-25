import React from 'react'

export default function FilteredNames({contactsList}) {

  return (
    <div>
        <ul>
            {contactsList.flatMap((item)=><li key={item.id}>{item.name}: {item.number}</li>)}
        </ul>
    </div>
  )
}
