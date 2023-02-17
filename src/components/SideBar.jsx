import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/sidebar.css'
const SideBarData=[
    {title:'Home',link:'/home'},
    {title:'Add Scenario',link:'/add_scenario'},
    {title:'All Scenarios',link:'/all_scenarios'},
    {title:'Add Vehicle',link:'/add_vehicle'}
]
function SideBar({children}) {
  return (
    <>
    <div className='container'>
    <nav className='sidebar'>
        <ul className='sidebarlist'>
            {SideBarData.map((val,key)=>{
                return (
                    <NavLink key={key} to={val.link} className='row'>
                        <li>{val.title}</li>
                    </NavLink>
                )
            })}
        </ul>
    </nav>
    <main className='mainContent'>{children}</main>
    </div>
    </>
  )
}

export default SideBar