import { useMessages } from "../context/MessageContext"


export default function Messages() {

  const {messages, clearMessages} = useMessages();
  return (
    <div>
        <div className="flex gap-3">
            <h2 className="text-2xl">
                <button onClick={clearMessages} className="p-2 bg-slate-700 text-white roudned-lg">
                    Clear messages
                </button>
            </h2>
        </div>
        {messages.map((message, index)=> (
            <div key={index} className="my-2">
                {message}
            </div>
        ))}
    </div>
  )
}
