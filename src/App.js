import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ScheduleHome from './Components/Pages/ScheduleHome'
import FormQuestion from './Components/Pages/FormQuestion'
import GetAllTest from './Components/Pages/GetAllTest'
import Dashboard from './Components/Pages/Dashboard'
import DataProvider from './Context/DataContext'
import CreateUser from './Components/Pages/CreateUser'
import AdminLogin from './Components/Pages/AdminLogin'
import GetAllUser from './Components/Pages/GetAllUser'
import GetOneExam from './Components/Pages/GetOneExam'
import AuthProvider from './Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './Components/Pages/LandingPage'
import CreateExam from './Components/Pages/CreateExam'
import UpdateExam from './Components/Pages/UpdateExam'
import { Exam } from './Components/Styled'
import ExamInfo from './Components/Pages/ExamInfo'


function App(isLoggedIn) {


  return (
    <DataProvider>
      <AuthProvider>
        <div className='app'>

          {/*  <Header /> 
    <SideBar /> 
  
            

*/}
          <div className='main_app'>

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route exact path="/adminlogin" element={<AdminLogin />} />
              <Route exact path="/createuser" element={<CreateUser />} />
              <Route exact path="/dashboard" element={<Dashboard />} >
                <Route exact path="getalltest" element={<GetAllTest />} />
                <Route exact path="getalluser" element={<GetAllUser />} />
              </Route>
              <Route exact path="/ScheduleHome" element={<ScheduleHome />} />
              <Route exact path="/createexam" element={<CreateExam />} />
              <Route exact path="/addquestions" element={<FormQuestion />} />
              <Route exact path="/update-exam" element={<UpdateExam />} />
              <Route exact path='/exam/:exam_number' element={<ExamInfo />} />
              <Route exact path="/getoneexam" element={<GetOneExam />} />


            </Routes>

            <ToastContainer />

          </div>



        </div>

      </AuthProvider>
    </DataProvider>

  )
}

export default App