import { FormEvent } from "react";
import { Person } from "../Types/Person";
import { useMessages } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";

type Props = {
    person?: Person;
    setPerson?: (person: Person) => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function PeopleForm({person, setPerson}: Props) {
    const {addMessage} = useMessages();
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const url =person ? `${apiUrl}/persons/${person.id}` : `${apiUrl}/persons`;
        const method = person ? 'PUT' : 'POST';
        try {
          const response = await fetch(url, {
            method: method,
            body: JSON.stringify({name: formData.get('name')})
          });
    
          if(!response.ok) throw new Error('Request failed: ' + response.statusText);
         const data = await response.json();
         const message = person 
         ? `Person ${person.name} updated to ${data.name}`
         : `Person ${data.name} created`
         addMessage(message);
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         person && setPerson
         ? setPerson(data)
         : navigate(`/persons/${data.id}`)
        } catch (error) {
          console.log(error);
          addMessage('Failed to update person')
        }
    }
    
  return (
    <div className="mt-3">
        <h2 className="text-2xl">{person ? 'Edit person' : 'Create person'}</h2>
          <form onSubmit={onSubmit}>
          <label>Person name</label>
          <div className='flex gap-3'>
          <input 
          type="text"
          placeholder="name"
          name='name'
          className="border border-blue-300 rounded-lg p-2 w-1/4" 
          defaultValue={person?.name || ''}
          />
          <button type='submit' className='p-2 bg-slate-700 text-white rounded-lg'>
            {person ? 'Update' : 'Create'}
          </button>
          </div>
            
          </form>
          
    </div>
  )
        
}
