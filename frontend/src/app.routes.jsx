import React from 'react'; 
import { createBrowserRouter } from 'react-router'; 
import Form from './features/form/Form';
import Detail from './features/form/Detail';
import Maindash from './features/form/Maindash';

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
  }
]);