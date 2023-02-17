import React from 'react'

function ReadRow({data,handleEditClick,rowName,handleDeleteClick,columns}) {
  return (
    <>
    <tr>
          {columns.map((val,key)=>{
            return <td key={key}>{data[val.field]}</td>
          })}
          <td><button type='button' style={{backgroundColor:"orange",border:"none",color:"white"}} onClick={(e)=>handleEditClick(e,data)}>Edit</button></td>
          <td><button type='button' style={{backgroundColor:"red",border:"none",color:"white"}} onClick={()=>rowName==="scenarios"?handleDeleteClick(data.id):handleDeleteClick(data.id,data.scenario_id)}>delete</button></td>
    </tr>
    </>
  )
}

export default ReadRow