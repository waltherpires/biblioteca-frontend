import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import Home from './pages/Home';

// Users
import CreateAccount from './pages/CreateAccount'
import Login, { action as authAction} from "./pages/Login";
import { action as logoutAction } from './pages/Logout';


import { globalLoader, checkAuthLoader } from './util/auth';
import EditUser from "./pages/EditUser";
import Users, {loader as usersLoader} from './pages/Users';
import UserDetail, {
  loader as userDetailLoader,
  action as deleteUserAction
} from './pages/UserDetail';
import { action as manipulateUserAction } from './components/UserForm'; 

import Messages, { loader as messageLoader } from './pages/Messages';


// Books
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import { action as manipulateBookAction } from './components/BookForm';
import Books, {loader as booksLoader} from './pages/Books';

import BookDetail, { 
  loader as bookDetailLoader,
  action as bookAction
} from './pages/BookDetail';

// Reservas
import Reservations, {loader as loaderReservations} from './pages/Reservations';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: globalLoader,
    children : [
      {index: true, element: <Home />},
      {
        path: 'users',
        children: [
          {index: true, element: <Users />, loader: usersLoader},
          {path: 'new', element: <CreateAccount />, action: manipulateUserAction},
          {
            path: ':userId',
            id: "user-detail",
            loader: userDetailLoader,
            children: [
              {index: true, element: <UserDetail />, action: deleteUserAction},
              {path: 'messages', element: <Messages />, loader: messageLoader},
              {path: 'edit', element: <EditUser />, loader: checkAuthLoader, action: manipulateUserAction}
            ]
          }
        ]
      },
      {path: 'login', element: <Login />, action: authAction},
      {path: 'logout', action: logoutAction},
      {
        path: 'books',
        children: [
          {index: true, element: <Books />, loader: booksLoader},
          {path: 'new', element: <CreateBook />, action: manipulateBookAction},
          {
            path: ':bookId',
            id: 'book-detail',
            loader: bookDetailLoader,
            children: [
              {index: true, element: <BookDetail />, action: bookAction},
              {path: 'edit', element: <EditBook />, loader: checkAuthLoader, action: manipulateBookAction},
              {path: 'reservations', element: <Reservations />, loader: loaderReservations},
            ]
          },

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
