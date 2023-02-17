import React, { useState } from 'react'
import EditRow from './EditRow.jsx'
import ReadRow from './ReadRow.jsx'
import api from '../../server-api/server.js';
function Table({tableData,tableName,tableColumns,tableActions,getData}) {
  const [editRowId,setEditRowId]=useState(null);
  const [editFormData,setEditFormData]=useState(tableName==="scenarios"?{
    id:0,
    name:"",
    time:0,
  }:{
    id:0,
    scenario_id:0,
    name:"",
    X_position:"",
    Y_position:"",
    speed:0,
    direction:"",
  })
  const handleEditClick=(event,row)=>{
    event.preventDefault();
    setEditRowId(row.id)
    const formValues=tableName==="scenarios"?{
        id:row.id,
        name:row.name,
        time:row.time
    }:{
        id:row.id,
        scenario_id:row.scenario_id,
        name:row.name,
        X_position:row.X_position,
        Y_position:row.Y_position,
        speed:row.speed,
        direction:row.direction,
    };
    setEditFormData(formValues);
  }
  const handleEditFormChange=(event)=>{
    event.preventDefault();
    const fieldName=event.target.getAttribute('name');
    const fieldValue=event.target.value;
    const newFormData={...editFormData}
    newFormData[fieldName]=fieldValue;
    setEditFormData(newFormData);
  }
  const handleEditFormSubmit=async(event)=>{
    event.preventDefault();
    await api.put(`/${tableName}/${editFormData.id}`,editFormData);
    tableName==="scenarios"?getData():getData(editFormData.scenario_id);
    setEditRowId(null);
  }
  const handleCancelClick=()=>{
    setEditRowId(null)
  }
  const handleDeleteScenario=async(rowId)=>{
    await api.delete(`/${tableName}/${rowId}`);
    getData();
  }
  const handleDeleteVehicle=async(rowId,scenarioId)=>{
    await api.delete(`/${tableName}/${rowId}`);
    getData(scenarioId);
  }
  return (
    <div>
    <form onSubmit={handleEditFormSubmit}>
    <table border={1} id='allScenarios'>
      <thead>
        <tr>
          {tableColumns.map((val,key)=>{
            return <th key={key}>{val.header}</th>
          })}
          {tableActions.map((val,key)=>{
            return <th key={key}>{val.header}</th>
          })}
        </tr>
        </thead>
        <tbody>
            <>
             {tableData.map((rowVal)=>{
                return (
                <>
                {editRowId === rowVal.id ?
                <EditRow key="editRow" editFormData={editFormData} rowName={tableName} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> :
                <ReadRow key="readRow" data={rowVal} handleEditClick={handleEditClick} rowName={tableName} handleDeleteClick={tableName==="scenarios"?handleDeleteScenario:handleDeleteVehicle} columns={tableColumns}/>
                }
                </>
                )
             })}
            </>
      </tbody>
    </table>
    </form>
    </div>
  )
}

export default Table