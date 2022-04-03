import React,{useState} from 'react'
import './Home.css'

function Home() {

  const [name, setName] = useState("");

  function startChat(){
    if(name===""){ console.log("Enter a name"); return}
    var enteredName = name
    setName("")
    window.location.href = `/chat?name=${enteredName}&room=chatRoom`
  }

  return (
    <div className="App"> 
        <div className='banner center-content'>
           React Chat App
        </div>
        <div className='info-section center-content'>
          <div className='form-group'>
          <label className="form-label">Enter a Display Name</label>
            <input onChange={(e)=>{setName(e.target.value)}} className="form-input" />
          </div>
          <div className='buttons'>
              <button onClick={()=>{startChat()}} className='button accent'>Join Chat</button>
          </div>
        </div>
    </div>
  )
}

export default Home