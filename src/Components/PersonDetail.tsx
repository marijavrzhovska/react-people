import { useEffect, useState ,useRef, ChangeEvent} from 'react';
import { Person } from '../Types/Person'
import { useParams } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;


export default function PersonDetail() {
  const [person, setPerson] = useState<Person | null>(null);
  const params = useParams();
  const fetched = useRef(false);
  useEffect(()=> {
    if(!fetched.current){
      fetch(`${apiUrl}/persons?/${params.id}`).then(rez => {
        return rez.json();
      }).then(data => {
        setPerson(data);
      })
      fetched.current = true;
    }
    
  }, [params.id])

  if(!person) return null;

  const handleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
    setPerson({...person, name: event.target.value})
  }
  
  
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
          onChange={handleNameChange}></input>
        </div>
     </>   
  )
}
