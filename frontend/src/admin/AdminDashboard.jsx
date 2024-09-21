import React, { Profiler } from 'react'
import SideBar from './Sidebar' 
import {Profile} from './UserProfile/Profile'
import { Aboutme } from '../component/Aboutme'

export const AdminDashboard = () => {
  return (
    <div className='flex justify-center content-center items-center'>
        <SideBar/>
       <div>
       <Profile />
       <div className=' lg:ml-2 md:ml-5 ml-20'>
       <Aboutme/>
       </div>
       </div>

    </div>
  )
}
