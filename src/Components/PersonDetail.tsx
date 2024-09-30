import { useEffect, useState ,useRef, FormEvent} from 'react';
import { Person } from '../Types/Person'
import { useParams } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';


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

  
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = `${apiUrl}/persons/${person.id}`
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({name: formData.get('name')})
      });

      if(!response.ok) throw new Error('Request failed: ' + response.statusText);
     const data = await response.json();
     addMessage(`Person ${person.name} updated to ${data.name}`);
     setPerson(data);
    } catch (error) {
      console.log(error);
      addMessage('Failed to update person')
    }

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
          <form onSubmit={onSubmit}>
          
          <div className='flex gap-3'>
          <input 
          type="text"
          placeholder="name"
          name='name'
          className="border border-blue-300 rounded-lg p-2 w-1/4" 
          defaultValue={person.name}
          />
          <button type='submit' className='p-2 bg-slate-700 text-white rounded-lg'>
            Submit
          </button>
          </div>
            
          </form>
        </div>
     </>   
  )
}
