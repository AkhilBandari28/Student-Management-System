import './App.css'
import Courses from './Courses'
import Home from './Home'
import ListOfCourses from './ListOfCourses'
import MyCourses from './MyCourses'
import Navbar from './Navbar'
import { AdminLogin } from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import StudentLogin from './pages/StudentLogin'
import StudentRegister from './pages/StudentRegister'
import AdminDetails from './Student/AdminDetails'
import AdminUpdate from './Student/AdminUpdate'
import StudentDetails from './Student/StudentDetails'
import StudentUpdate from './Student/StudentUpdate'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
      {/* <h1>Student Management System</h1> */}
      <BrowserRouter>
      {/* <Home /> */}
        <Routes>
          <Route path='/' element={<Home />}/>
          {/* <Route path='/Navbar' element={<Navbar />}/> */}
          <Route path='/studentregister' element={<StudentRegister />}/>
          <Route path='/studentlogin' element={<StudentLogin />}/>
          <Route path='/adminregister' element={<AdminRegister />}/>
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/studentdetails' element={<StudentDetails />}/>
          <Route path='/studentupdate' element={<StudentUpdate />}/>
          <Route path='/adminupdate' element={<AdminUpdate />}/>
          <Route path='/admindetails' element={<AdminDetails />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/mycourses' element={<MyCourses />}/>
          <Route path='/listofcourses' element={<ListOfCourses />}/>
        </Routes>
      </BrowserRouter>

      {/* <Home />
      <StudentUpdate /> */}
      {/* <StudentDetails /> */}
      {/* <StudentRegister /> */}
      {/* <StudentLogin /> */}
      {/* <AdminRegister /> */}
      {/* <AdminLogin /> */}
    </>
  )
}

export default App
