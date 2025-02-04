import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/Root";
import EventRoot from "./layout/EventRoot";
import HomePage from "./pages/Home";

import EventsPage from './pages/Events';
import EventDetails from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRoot />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: ":id", element: <EventDetails /> },
          { path: "new", element: <NewEvent /> },
          { path: ":id/edit", element: <EditEvent /> },
        ],
      }
      
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
