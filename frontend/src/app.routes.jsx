import React from 'react'; 
import { createBrowserRouter } from 'react-router'; 
import Form from './features/form/Form';
import Detail from './features/form/Detail';
import Maindash from './features/form/Maindash';
import Dashboard from './features/form/Dashboard';

export const router = createBrowserRouter([
  {
    path: "/query",
    element: <Form />,
  },
  {
    path : "/detail" ,
    element : <Detail/>
  },
  {
    path:"/user" ,
    element : <Maindash/>
  },
  {
    path : "/" ,
    element : <Dashboard/>
  }
]);