import { ChangeEvent } from 'react';
import { Person } from '../Types/Person'

type Props = {
    person?: Person;
    onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonDetail({person, onChangeName}: Props) {
    if(!person) return null;
  
  
    return (
    <>
          <h2 className="text-2xl">Details</h2>
        <div>
          <span className="font-bold">ID:{person.id}</span>
        </div>
        <div className="space-x-2">
          <span className="font-bold">Name:</span>
          <span className="uppercase">{person.name}</span>
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t">
          <label>Person name</label>
          <input 
          type="text"
          placeholder="name"
          className="border border-blue-300 rounded-lg p-2 w-1/4" 
          value={person.name}
          onChange={onChangeName}></input>
        </div>
     </>   
  )
}
