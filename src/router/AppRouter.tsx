import React from 'react'
import { privateRoutes, publicRoutes } from './Routes'
import { Route, Routes } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const AppRouter = () => {
  const {user} = useAuth()

  return (
    <Routes>
      {!user && publicRoutes.map(({Component, path}) => <Route key={path} path={path} element={<Component />} />)}
      {user && privateRoutes.map(({Component, path}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  )
}

export default AppRouter