import { useState, useRef, useEffect } from "react";
import { Person } from "../Types/Person";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;


export default function Dashboard() {
  const [persons, setPersons] = useState<Person[]>([]);
  const fetched = useRef(false);
  useEffect(()=> {
    if(!fetched.current){
      fetch(`${apiUrl}/persons?_limit=4`).then(rez => {
        return rez.json();
      }).then(data => {
        setPersons(data);
      })
      fetched.current = true;
    }
    
  }, [])
  
  return (
    <div className="flex flex-col gap3">
      <h2 className="text-2xl">Top people</h2>
      <div className="flex gap-3">
      {persons.map(person => (
        <Link key={person.id} to={`/persons/${person.id}`} 
        className="p-4 bg-slate-700 text-white rounded-lg crusor-pointer">
        {person.name}
        </Link>
      ))}
      </div>
      
    </div>
  )
}
