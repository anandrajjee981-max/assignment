import React from 'react'; 
import { createBrowserRouter } from 'react-router'; 
import Form from './features/form/Form';
import Detail from './features/form/Detail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path : "/detail" ,
    element : <Detail/>
  }
]);