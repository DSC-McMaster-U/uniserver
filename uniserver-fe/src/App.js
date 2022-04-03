import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Chat from './Pages/Chat/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='chat' element={<Chat/>}/>  
        </Routes>  
      </Router>  

    </div>
  );
}

export default App;
