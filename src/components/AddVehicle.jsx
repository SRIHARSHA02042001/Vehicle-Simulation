import { useEffect, useState } from "react";
import React from 'react'
import api from '../server-api/server.js'
import '../styles/vehicle.css'
import Buttons from "./Buttons.jsx";
function AddVehicle() {
  const [allScenarios,setAllScenarios]=useState(Array);
  const [vehicleName,setVehicleName]=useState("");
  const [vehicleSpeed,setVehicleSpeed]=useState(Number);
  const [xPostion,setXposition]=useState(Number);
  const [yPosition,setYposition]=useState(Number);
  const [direction,setDirection]=useState("towards");
  const [scenario,setScenario]=useState(Number);
  const directionList=["towards","backwards","upwards","downwards"];
  useEffect(()=>{
    const getAllScenarios=async()=>{
        const res=await api.get('/scenarios');
        setAllScenarios(res.data);
        setScenario(res.data[0]['id']);
    }
    getAllScenarios();
  },[]);
  const handleSubmit=async (event)=>{
    event.preventDefault();
    if(xPostion<0 || xPostion>800){
        return false;
    }
    if(yPosition<0 || yPosition>800){
        return false;
    }
    if(vehicleSpeed<0){
        return false;
    }
    const min = 11;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const request={
        id:randomNumber,
        scenario_id:scenario,
        name:vehicleName,
        X_position:xPostion,
        Y_position:yPosition,
        speed:vehicleSpeed,
        direction:direction,
    }
    await api.post('/vehicles',request);
    alert("Vehicle added sucessfully");
    resetData();
  };
  const resetData=()=>{
    setVehicleName("");
    setDirection("towards");
    setVehicleSpeed(0);
    setXposition(0);
    setYposition(0);
    setScenario(allScenarios[0]["id"]);
  }
  return (
    <div>
        <h2>Add Vehicle</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <table className='vehicle-container' id="addVehicle">
                    <tbody>
                    <tr>
                        <td>
                            <label>Scenario List:</label>
                        </td>
                        <td>
                            <label >Vehicle Name:</label>
                        </td>
                        <td>
                            <label >Vehicle Speed:</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select required placeholder='Select Scenario' value={scenario} onChange={(e)=>setScenario(e.target.value)}>
                                {allScenarios.map((val,key)=>{
                                    return <option key={key} value={val.id}>{val.name}</option>
                                })}
                            </select>
                        </td>
                        <td>
                            <input required placeholder='Enter Name' type='text' value={vehicleName} minLength="6" maxLength="25" onChange={(e)=>setVehicleName(e.target.value)}/>
                        </td>
                        <td>
                            <input id="speed" required type='number' min={0} value={vehicleSpeed} onChange={(e)=>setVehicleSpeed(e.target.value)} placeholder="Enter speed"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Position X:</label>
                        </td>
                        <td>
                            <label >Position Y:</label>
                        </td>
                        <td>
                            <label >Direction:</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input required id="xPosition" min={0} max={800} placeholder='Enter X in range 0-8000' value={xPostion}  onChange={(e)=>setXposition(e.target.value)} type='number' />
                        </td>
                        <td>
                            <input required id="yPosition" min={0} max={800} placeholder='Enter y in range 0-8000 time' value={yPosition} onChange={(e)=>setYposition(e.target.value)} type='number'/>
                        </td>
                        <td>
                            <select required value={direction} onChange={(e)=>setDirection(e.target.value)} placeholder="Enter Direction">
                                {directionList.map((val,key)=>{
                                    return <option key={key} value={val}>{val}</option>
                                })}
                            </select>
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

export default AddVehicle