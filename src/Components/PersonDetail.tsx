import { useEffect, useState ,useRef} from 'react';
import { Person } from '../Types/Person'
import { useParams } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';
import PeopleForm from './PeopleForm';


const apiUrl = import.meta.env.VITE_API_URL;


export default function PersonDetail() {
  const [person, setPerson] = useState<Person | null>(null);
  const params = useParams();
  const fetched = useRef(false);
  const {addMessage} = useMessages();
  
  useEffect(()=> {
    if(!fetched.current){
      fetch(`${apiUrl}/persons/${params.id}`).then(rez => {
        return rez.json();
      }).then(data => {
        setPerson(data);
        addMessage(`Person ${data.name} loaded`)
      })
      fetched.current = true;
    }
    
  }, [params.id, addMessage])

  if(!person) return null;

  
  
  
  
  
    return (
    <>
          <h2 className="text-2xl">Details</h2>
        <div>
          <span className="font-bold">{person.id}</span>
        </div>
        <div className="space-x-2">
          <span className="font-bold">Name:</span>
          <span className="uppercase">{person.name}</span>
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t">
          <PeopleForm person={person} setPerson={setPerson}/>
        
        </div>
     </>   
  )
}
