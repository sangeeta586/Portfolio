import React, { Profiler } from 'react'
import SideBar from './Sidebar' 
import {Profile} from './UserProfile/Profile'

export const AdminDashboard = () => {
  return (
    <div className='flex justify-center content-center items-center'>
        <SideBar/>
        <Profile />
    </div>
  )
}
