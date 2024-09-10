import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact/> 
      {/* why exact: because  we want to match the exact path ani dusra path vr home yeu lgl mnun*/}
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
