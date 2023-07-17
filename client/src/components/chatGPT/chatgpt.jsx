import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput,TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = "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";

const systemMessage = {
    "role": "system",
    "content": "Explain things like you are talking to a software professional with 2 years of experience."
}

export default function Chatgpt() {
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sender: "ChatGPT"
        }
    ]);

    const handleSend = async(message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);

    }

    async function processMessageToChatGPT(chatMessages){
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
              role = "assistant";
            } else {
              role = "user";
            }
            return { role: role, content: messageObject.message}
          });

          const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
              systemMessage,
              ...apiMessages
            ]
          }

          await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
    }

    return(
        <div>
            <div className='main'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" />: null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message}/>
                            })}

                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}