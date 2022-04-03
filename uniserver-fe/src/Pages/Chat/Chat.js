import React,{useState,useEffect,useRef} from 'react'
import './Chat.css'
import queryString from "query-string";
import io from "socket.io-client"
import axios from 'axios'

let socket;

function Chat(props) {
  const ENDPOINT = "http://localhost:5000";

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottomRightAway = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  const [name, setName] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const Name = queryParams.get("name")
    console.log(Name)
    setName(Name)
    console.log(name)
    socket = io(ENDPOINT);
    
    //join using name and room
    socket.emit("join", { name:Name, room:"chatRoom" }, (error) => {
    if (error) alert("Something went wrong try again");
    });
  }, []);


  const [loader,setLoader] = useState(true);
  useEffect(()=>{
    axios.get(ENDPOINT+"/chatLogs").then((result) => {
      setLoader(true)
      console.log(result)
      setMessages(result.data)
      scrollToBottomRightAway();
      setLoader(false)
    }).catch((err) => {
      console.log(err)
    });
  },[])

  const [messages, setMessages] = useState([]);
  const [message,setMessage] = useState("");


  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      console.log(messages)
      scrollToBottom();
    });

  }, []);

  function sendMessage(e){
    
    setMessage("")
    var enteredMessage = message;
    if (enteredMessage) {
      console.log(message)
      socket.emit("sendMessage", { message:enteredMessage });
    } 
    else alert("empty input");
    e.preventDefault()
  }
  
  return (
      <div className="container"> 
          <div className="side-bar">
            <div className='back' onClick={()=>{window.location.href="/"}}>Back</div>
            <div className='info'>
              <h3>Welcome to the Chat Room</h3>
              <h4>Follow this rules :</h4>
              <ol className='rules'>
                <li>&nbsp;Be nice to everyone.</li>
                <li>&nbsp;No links No promotion.</li>
              </ol>           
            </div>
          </div>
          <div className='main'>
            <div className='header'>
               Chat Room
            </div>
            <div className='chat-space'>
              {loader &&
                <p>Loading old chat logs. Please Wait...
                  <br></br>
                  Meanwhile you can still chat
                </p>
                
              }
              <div className="messages">
              {messages.map((val, i) => {
                  if(val.user==="Admin"){
                    return (
                      <div className='admin-message' key={i}>
                        {val.text}
                      </div>
                    );
                  }
                  else if(val.user===name){
                    return (
                      <div className='my-message' key={i}>
                        <div className='message-header'>
                          <div className='message-header-name'>
                            <img className='user-icon' src={`https://avatars.dicebear.com/api/initials/${val.user}.svg`} alt="" />  
                            {val.user}
                          </div>
                          <div className='time-stamp'>
                            {val.time}
                          </div>
                        </div>  
                        <div className='my-message-value'>
                          {val.text}
                        </div>
                      </div>
                    )
                  }
                  else{
                    return (
                      <div className='other-message' key={i}>
                        <div className='message-header'>
                          <div className='message-header-name'>
                            <img className='user-icon' src={`https://avatars.dicebear.com/api/initials/${val.user}.svg`} alt="" />  
                            {val.user}
                          </div>
                          <div className='time-stamp'>
                           {val.time}
                          </div>
                        </div>  
                        <div className='my-message-value'>
                          {val.text}
                        </div>
                      </div>
                    )
                  }
                  
                })}
                 <div ref={messagesEndRef} />
              </div>
              <form onSubmit={(e)=>{sendMessage(e)}}>
                <div className='message-input-container'>
                  <input type='text' className='message-input' value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Enter your Message'>
                  </input>
                  <button type='submit' className='send-button'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                  </svg>
                  </button>  
                </div>
              </form>
            </div>
          </div>
      </div>
 
  )
}

export default Chat