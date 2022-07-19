import { Outlet } from 'react-router-dom';
import Header from './common/header';
import Navbar from './common/navbar';
import CompareProject from './compare-project/compare-project';

// TODO:
// 1. setup route to seperate pages
// 2. continue working on compare project
//   2.1 allows to horisontal scroll when projects have too many
//   2.2 setup all metrics and weight column
//   2.3 add/remove project atomatically
function App() {
  return (
    <div className="App">
      <header className="App-container">
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
