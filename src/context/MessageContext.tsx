/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type MessageContextType = {
    messages: string[];
    addMessage: (message: string) => void;
    clearMessages: () => void;
}

const MessageContextType = createContext<MessageContextType | undefined>(undefined)

const MessageProvider = ({children}: {children: ReactNode}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const addMessage = useCallback( (message: string) => {
        setMessages(prevMessages => [...prevMessages, message])
    }, [])

const clearMessages = () =>{
    setMessages([]);
}

return (
    <MessageContextType.Provider value={{messages, addMessage, clearMessages}}>
        {children}
    </MessageContextType.Provider>
)
}

const useMessages = () => {
    const context = useContext(MessageContextType);

    if(context===undefined){
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
}

export {MessageProvider, useMessages}