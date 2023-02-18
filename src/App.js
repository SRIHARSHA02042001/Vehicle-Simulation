import './App.css';
import SideBar from './components/SideBar';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home.jsx';
import AddScenario from './components/AddScenario.jsx';
import AddVehicle from './components/AddVehicle.jsx';
import AllScenarios from './components/AllScenarios.jsx';
function App() {
  return (
    <div>
      <SideBar>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='home' element={<Home/>}></Route>
            <Route path='add_vehicle' element={<AddVehicle/>}></Route>
            <Route path='add_scenario' element={<AddScenario/>}></Route>
            <Route path='all_scenarios' element={<AllScenarios/>}></Route>
            <Route path='*' element={<h1>No Page Found</h1>}></Route>
          </Routes>
        </SideBar>
    </div>
  );
}

export default App;
