/* eslint-disable react/prop-types */
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import LandingPage from './pages/Landing/LandingPage'
import BoardDetailPage from './pages/Boards/BoardDetailPage'
import BoardsPage from './pages/Boards/BoardsPage'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Board Details */}
        <Route path='/boards/:boardId' element={<BoardDetailPage />}/>
        <Route path='/boards' element={<BoardsPage />}/>

        {/* User Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      {/* Authenticaton */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
