import { Outlet } from 'react-router-dom';
import Header from './common/header';
import Navbar from './common/navbar';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-container">
        <Header></Header>
        <Navbar></Navbar>
        <Outlet/>
      </header>
    </div>
  );
}

export default App;
