import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';

import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children : [
      {index: true, element: <Home />}
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
