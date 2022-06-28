import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function ScheduleHome() {
  return (
  <div className='container'>
    <div className='schedule'>

    
    <div className='schedule_greets'>
      <h3>Good Afternoon,</h3>
      <h2>Admin</h2>
    </div>
     
    
      <div className='schedule_links'>
        <ul>
            <li><Link to='/getalltest' >Scheduled Exams <FaArrowRight /></Link> </li>
            <li><Link to='/getoneexam' >Single Exam <FaArrowRight /></Link> </li>
            <li><Link to='/FormQuestions' >New Exam <FaArrowRight /></Link> </li>
           
        </ul>
    
      </div>
    
    
      </div>
  </div>
    
  )
}


export default ScheduleHome
