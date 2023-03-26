import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import DetailState from './Context/details/DetailState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AllResume from './Components/AllResume'
import Alert from './Components/Alert';
import {useState} from 'react';

const App = () =>{
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }
  return (
    <DetailState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <div className='container'>
        <Switch>
          <Route exact path = "/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path = "/resume">
            <AllResume showAlert={showAlert}/>
          </Route>
          <Route exact path = "/about">
            <About />
          </Route>
          <Route exact path = "/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path = "/signup">
            <SignUp showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
      </Router>
    </DetailState>
  );
}

export default App;
