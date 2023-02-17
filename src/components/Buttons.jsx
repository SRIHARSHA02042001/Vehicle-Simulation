import React from 'react'
import { useNavigate } from 'react-router-dom'
function Buttons({resetData}) {
  const history=useNavigate();
  return (
    <>
    <button id='formButton'  type='submit'  className='add-button'>Add</button>&nbsp;&nbsp;
    <button id="formButton" className='reset-button' onClick={resetData}>Reset</button>&nbsp;&nbsp;
    <button id="formButton" className='back-button' onClick={()=>history(-1)}>Go Back</button>
    </>
  )
}

export default Buttons