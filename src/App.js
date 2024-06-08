import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './Users/Users.jsx';
import Roles from './roles/Roles.jsx';
import Signin from './signin/Signin2.jsx';
import Permission from './permission/Permission.jsx';
import Quickstart from './quickstart/Quickstart.jsx';

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/roles",
    element: <Roles />
  },
  {
    path: "/permissions",
    element: <Permission />
  },
  {
    path: "/sign-in",
    element: <Signin />
  },
  {
    path: "/quickstart",
    element: <Quickstart />
  }

])

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
