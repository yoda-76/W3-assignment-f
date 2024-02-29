import { useState } from 'react';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Todo from './Pages/Todo';

function App() {
  return (
    <div>
      <b>Note 1: </b> the site is slow as it is running on free instance. when you run it locally it will be fast<br/>
      <b>Note 2: </b> to check the swagger docs. run it locally and then visit : http://localhost:5000/docs




      <div className='login'>

      </div>
      <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
    </div>


  );
}

export default App;
