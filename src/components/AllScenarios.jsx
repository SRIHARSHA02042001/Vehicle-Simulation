import React, { useEffect, useState } from 'react'
import api from '../server-api/server.js'
import '../styles/allScenarios.css'
import Table from './Table/Table.jsx'
function AllScenarios() {
  const [allScenarios,setScenarios]=useState(Array)
  const [load,SetLoad]=useState(true);
  const tableName="scenarios";
  const getAllScenarios=async ()=>{
    const resp=await api.get('/scenarios')
    if(resp.data) {
      setScenarios(resp.data);
      SetLoad(false);
    }
  };
  useEffect(()=>{
    getAllScenarios();
  },[]);
  const actions=[{field:"Edit",header:"Edit"},{field:"Delete",header:"Delete"}];
  const tableColumns=[{field:"id",header:"Scenario Id"},{field:"name",header:"Scenario name"},{field:"time",header:"Scenario Time"}]
  return (
    <>
    <h2>All Scenarios</h2>
    {allScenarios.length!==0?
    <Table tableData={allScenarios} tableName={tableName} tableColumns={tableColumns} tableActions={actions} getData={getAllScenarios}/>
    :
    <p>{load?"Loading...":"No Data"}</p>
    }
    </>
  )
}

export default AllScenarios