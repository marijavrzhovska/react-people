import { ChangeEvent, Fragment, useState } from "react"
import { Person } from './Types/Person'
import { PERSONS } from "./data/mock-persons";


export default function App() {
  const [persons, setPersons] = useState<Person[]>(PERSONS);
  const [selectedPersonId, SetSelectedPersonId] = useState<number | null>(null);
  const selectedPerson = persons.find(person => person.id === selectedPersonId);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  const updatedName = event.target.value;
  setPersons(prevPersons => prevPersons.map(person => {
    if(person.id === selectedPersonId){
      return {...person, name: updatedName}
    }
    return person;
  }))
}

const handleSelectPerson =(id: number) => {
  SetSelectedPersonId(id);
}
  
  return (
    <div className="container mt-5 mx-auto">
        <h2 className="text-2xl">People</h2>
        <ul className="flex flex-col gap-2 my-3">
          {persons.map(person => (
            <li key={person.id} className="flex cursor-pointer" onClick={() => handleSelectPerson(person.id)}>
              <span className="bg-slate-700 text-red-500 rounded-l p-2">{person.id}</span>
              <span className="p-2 bg-slate-300 rounded-r w-1/4">{person.name}</span>
            </li>
          ))}
        </ul>
        {selectedPerson &&
        <Fragment>
          <h2 className="text-2xl">Details</h2>
        <div>
          <span className="font-bold">ID:{selectedPerson.id}</span>
        </div>
        <div className="space-x-2">
          <span className="font-bold">Name:</span>
          <span className="uppercase">{selectedPerson.name}</span>
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t">
          <label>Person name</label>
          <input 
          type="text"
          placeholder="name"
          className="border border-blue-300 rounded-lg p-2 w-1/4" 
          value={selectedPerson.name}
          onChange={handleNameChange}></input>
        </div>
        </Fragment>}
    </div>
  )
}