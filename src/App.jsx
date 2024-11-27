import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Home from './pages/Home';

import CreateAccount from './pages/CreateAccount'
import Users, {loader as usersLoader} from './pages/Users';
import UserDetail, {
  loader as userDetailLoader,
  action as deleteUserAction
} from './pages/UserDetail';

import Books, {loader as booksLoader} from './pages/Books';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children : [
      {index: true, element: <Home />},
      {
        path: 'users',
        children: [
          {index: true, element: <Users />, loader: usersLoader},
          {path: 'new', element: <CreateAccount />},
          {
            path: ':userId',
            id: "user-detail",
            loader: userDetailLoader,
            children: [
              {index: true, element: <UserDetail />, action: deleteUserAction},
            ]
          }
        ]
      },
      {
        path: 'books',
        children: [
          {index: true, element: <Books />, loader: booksLoader}
        ]
      }
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
