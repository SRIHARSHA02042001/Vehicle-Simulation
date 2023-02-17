import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import api from '../server-api/server.js'
import Table from './Table/Table';
function Home() {
  const [scenarios,setScenarios]=useState(Array);
  const [filteredVehicles,setFilteredVehicles]=useState(Array);
  const [scenarioId,setScenarioId]=useState(Number);
  const [load,setLoad]=useState(true);
  const tableColumns=[
    {field:"id",header:"Vehicle Id"},
    {field:"name",header:"Vehicle Name"},
    {field:"speed",header:"Vehicle Speed"},
    {field:"X_position",header:"X Position"},
    {field:"Y_position",header:"Y Position"},
    {field:"direction",header:"Direction"}
  ]
  const tableActions=[{field:"edit",header:"Edit"},{field:"delete",header:"Delete"}]
  const tableName="vehicles";
  const width=780;
  const height=350;
  let time=0;
  const totalTime=()=>{
    const id=scenarios.findIndex(item=>item.id===scenarioId);
    return parseInt(scenarios[id]["time"]);
  }
  const start=(check)=>{
    if(check){
      const tTime=totalTime();
      for(let i=0;time!==tTime;i++){
        // setTimeout(()=>{
        //   console.log('timeout');
        // },1000)
        for(let j=0;j<1000;j++);
        time=time+1;
      }
      if(time===tTime){
        setCoordinates();
      }
    }
    else{
      setCoordinates();
    }
  }
  const setCoordinates=()=>{
    const data=[...filteredVehicles];
    for(let i=0;i<filteredVehicles.length;i++){
    let x=parseInt(filteredVehicles[i]["X_position"]);
    let y=parseInt(filteredVehicles[i]["Y_position"]);
    let direction=filteredVehicles[i]["direction"];
    let speed=parseInt(filteredVehicles[i]["speed"]);
      if(direction==="towards"){
        x=x+(speed*time);
      }
      else if(direction==="backwards"){
        x=x-(speed*time)
      }
      else if(direction==="upwards"){
        y=y+(speed*time);
      }
      else{
        y=y-(speed*time);
      }
      const index=data.findIndex(item=>item.id===filteredVehicles[i]["id"]);
      if((x>-1 && x<800) && (y>-1 && y<800)){
          data[index]["X_position"]=x;
          data[index]["Y_position"]=y;
      }
      else{
          data[index]["X_position"]=0;
          data[index]["Y_position"]=0;
        } 
    }
    setFilteredVehicles(data);
  }
  const getVehicles=async(rowId)=>{
    const id=parseInt(rowId);
    setScenarioId(id);
    const resp=await api.get(`/vehicles?scenario_id=${id}`);
    if(resp.data){
      setFilteredVehicles(resp.data);
      setLoad(false);
    }
  }
  const checkPosition=(x,y)=>{
    if((x>-1 && x<width) && (y>-1 && y<height)){
      return true;
    }
    return false
  }
  useEffect(()=>{
    const initialState= async()=>{
      const resp=await api.get('/scenarios');
      if(resp.data){
        setScenarios(resp.data);
        setTimeout(()=>{
            getVehicles(resp.data[0]["id"]);
        },2000)
      }
    }
    initialState();
  },[]);
  return (
    <div>
      <h2>Home</h2>
      <form className='homeForm'>
          <label>Select Scenario:</label>&nbsp;
          <select value={scenarioId} onChange={(e)=>getVehicles(e.target.value)} placeholder="Select Scenario">
            {scenarios.map((val,key)=>{
              return <option key={key+"vehicleData"} value={val.id}>{val.name}</option>
            })}
          </select>
        </form>
        <br/>
        {filteredVehicles.length!==0?
        <>
        <Table tableData={filteredVehicles} tableName={tableName} tableColumns={tableColumns} tableActions={tableActions} getData={getVehicles}/>
        <br/>
        <button type='button' onClick={()=>start(true)}>start simulation</button>&nbsp;
        <button type='button' onClick={()=>start(false)}>stop simulation</button><br/><br/>
        <div className='graph-box'>
           {filteredVehicles.map((val,key)=>{
            if (checkPosition(val.X_position,val.Y_position)){ 
                return <div key={key} className='graph' style={{bottom: `${(val.Y_position)}px` ,left: `${(val.X_position)}px`}}>{val.id}</div>
            }
            return <div>{val.x}</div>
            })}   
        </div>
        </>
        :
        <p>{load?"Loading...":"No Data"}</p>
        }
    </div>
  )
}

export default Home