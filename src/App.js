import './App.css';
import SideNavBar from './component/SideNavBar'
import Page from './component/Page';
import User from './component/User';
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SideNavBar/>}/>
        <Route path='/page' element={<Page/>}/>
        <Route path='/user' element={<User/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
