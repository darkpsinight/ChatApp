import './App.css';
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

const socket = io.connect('wss://localhost:4000')

function App() {

  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])



  useEffect(() => {
    socket.on('message', ({ name, message }) => (
      setChat([...chat, { name, message }])
    ))
  })


  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ mesage: '', name })
  }



  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }




  return (
    <div className="App">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className='name-field'>
          <TextField
            name='name'
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name='message'
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant='outlined'
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>


      {/* Render messenger - Chat Log*/}

      <div className='render-chat'>
        <h1>Chat Log:</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
