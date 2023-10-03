import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
 import Task from './Task';
import Login from './Login';
import Register from './Register';
//  import CreateTask from './CreateTask';
// import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path='/task' element={<Task />}></Route> 
     <Route path='/register' element={<Register />}></Route>
     <Route path='/' element={<Login />}></Route>
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
