import { useState, useRef, useEffect } from "react";
import { Person } from "../Types/Person";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PersonsList() {
  const [persons, setPersons] = useState<Person[]>([]);

  const fetched = useRef(false);

  const {addMessage} = useMessages();
  useEffect(()=> {
    if(!fetched.current){
      fetch(`${apiUrl}/persons`).then(rez => {
        return rez.json();
      }).then(data => {
        setPersons(data);
        addMessage('people added')
      })
      fetched.current = true;
    }
    
  }, [addMessage])


  
  return (
    <>
        <h2 className="text-2xl">People</h2>
        <ul className="flex flex-col gap-2 my-3">
          {persons.map(person => (
            <Link to={`/persons/${person.id}`} key={person.id} className="flex cursor-pointer" >
              <span className="bg-slate-700 text-red-500 rounded-l p-2">{person.id}</span>
              <span className="p-2 bg-slate-300 rounded-r w-full">{person.name}</span>
            </Link>
          ))}
        </ul>
    </>
  )
}

