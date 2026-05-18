import React from 'react'; 
import { createBrowserRouter } from 'react-router'; 
import Form from './features/form/Form';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
]);