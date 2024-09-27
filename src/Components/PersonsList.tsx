import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Person } from "../Types/Person";
import PersonDetail from "./PersonDetail";


export default function PersonsList() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, SetSelectedPersonId] = useState<number | null>(null);
  const fetched = useRef(false);
  useEffect(()=> {
    if(!fetched.current){
      fetch('http://localhost:3000/persons').then(rez => {
        return rez.json();
      }).then(data => {
        setPersons(data);
      })
      fetched.current = true;
    }
    
  }, [])


  
  return (
    <>
        <h2 className="text-2xl">People</h2>
        <ul className="flex flex-col gap-2 my-3">
          {persons.map(person => (
            <link to={`/persons/${person.id}`} key={person.id} className="flex cursor-pointer" >
              <span className="bg-slate-700 text-red-500 rounded-l p-2">{person.id}</span>
              <span className="p-2 bg-slate-300 rounded-r w-full">{person.name}</span>
            </li>
          ))}
        </ul>
    </>
  )
}

