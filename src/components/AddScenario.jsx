import React, { useState } from 'react'
import '../styles/scenario.css'
import api from '../server-api/server.js'
import Buttons from './Buttons';
function AddScenario() {
  const [scenarioName,setScenarioName]=useState("");
  const [scenarioTime,setScenarioTime]=useState(1);
  const resetData=()=>{
    setScenarioName("");
    setScenarioTime(1);
  }
  const handleSubmit=async (event)=>{
    event.preventDefault();
    if(scenarioTime<1){
        alert("Time should be > 1")
        return false;
    }
    const min = 11;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const request={
        id:randomNumber,
        name:scenarioName,
        time:scenarioTime,
    }
    await api.post('/scenarios',request);
    alert("Scenario added successfully");
    resetData();
  }  
  return (
    <div>
        <h2>Add Scenario</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <table className='scenario-container' id="addScenario">
                    <tbody>
                    <tr>
                        <td>
                        <label >Scenario Name:</label>
                        </td>
                        <td>
                        <label style={{marginLeft:"250px"}}>Scenario Time(Seconds):</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input required placeholder='Enter name' value={scenarioName} minLength='6' maxLength="25" onChange={(e)=>setScenarioName(e.target.value)} type='text'  name='name'/>
                        </td>
                        <td>
                            <input required style={{marginLeft:"250px"}} placeholder='Enter time' value={scenarioTime} onChange={(e)=>setScenarioTime(e.target.value)} type='number'  name='time'/>
                        </td>
                    </tr>
                    </tbody>
                </table><br/>
                <Buttons handleSubmit={handleSubmit} resetData={resetData}/>
            </form>
        </div>
    </div>
  )
}
export default AddScenario