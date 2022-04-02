import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Socket.io Instance Creation
const socket = io('http://localhost:4000');

function App() {
	const [msg, setMsg] = useState('');

	const sendMsg = (e) => {
		e.preventDefault();
		socket.emit('message', msg);
		setMsg('');
	};
	return (
		<div>
			<p>You are in room: {socket.id}</p>

			<br />

			<form>
				<label>
					Message:
					<input type='text' name='message' value={msg} onChange={(e) => setMsg(e.target.value)} />
					<input type='submit' value='Submit' onClick={(e) => sendMsg(e)} />
				</label>
			</form>
		</div>
	);
}

export default App;
