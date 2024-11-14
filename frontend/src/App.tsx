import React,{lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserDashboard } from './components/Dashboard';
import './App.css'
import { UserLayout } from './UserLayout';


export const App = React.memo(() => {

  return (
    <>
      <BrowserRouter>
      <Suspense fallback={''}>
       <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path='/dashboard' element={<UserDashboard />} />
          </Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  )
}
);

