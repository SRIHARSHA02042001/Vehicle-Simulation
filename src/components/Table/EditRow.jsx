import React from 'react'

function EditRow({editFormData,rowName,handleEditFormChange,handleCancelClick}) {
  const directionList=["towards","backwards","upwards","downwards"];
  return (
    <>
    <tr>
        <td>
            <input type="number" value={editFormData.id} name="id" readOnly onChange={(e)=>handleEditFormChange(e)}/>
        </td>
        <td>
            <input type="text" required value={editFormData.name} name="name" placeholder='Enter name' minLength={6} maxLength={25} onChange={(e)=>handleEditFormChange(e)}/>
        </td>
        {rowName==="scenarios"?
        <td>
            <input type="number" required value={editFormData.time} name="time" min={1} placeholder="Enter time in sec" onChange={(e)=>handleEditFormChange(e)}/>
        </td>
        :
        <>
        <td>
            <input name="speed" required type='number' min={0} value={editFormData.speed} onChange={(e)=>handleEditFormChange(e)} placeholder="Enter speed"/>
        </td>
        <td>
            <input required name="X_position" min={0} max={800} placeholder='Enter X in range 0-8000' value={editFormData.X_position}  onChange={(e)=>handleEditFormChange(e)} type='number' />
        </td>
        <td>
            <input required name="Y_position" min={0} max={800} placeholder='Enter y in range 0-8000 time' value={editFormData.Y_position} onChange={(e)=>handleEditFormChange(e)} type='number'/>
        </td>
        <td>
            <select required name="direction" value={editFormData.direction} onChange={(e)=>handleEditFormChange(e)} placeholder="Enter Direction">
                {directionList.map((val,key)=>{
                    return <option key={key} value={val}>{val}</option>
                })}
            </select>
        </td>
        </>
        }
        <td>
            <button style={{backgroundColor:"green",border:"none"}} type='submit'>submit</button>
            <button style={{marginTop:'5px',backgroundColor:"red",border:"none"}} type='button' onClick={handleCancelClick}>cancel</button>
        </td>
    </tr>
    </>
  )
}

export default EditRow