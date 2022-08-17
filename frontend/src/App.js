import { Outlet } from 'react-router-dom';
import Header from './common/header';
import Navbar from './common/navbar';
import { Button } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-container">
        <Button variation="primary">Hello world</Button>
        <Header></Header>
        <Navbar></Navbar>
        <Outlet/>
        {/* Main Content */}
        {/* Footer */}
      </header>
    </div>
  );
}

export default App;
