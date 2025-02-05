import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/Root";
import EventRoot from "./layout/EventRoot";
import HomePage from "./pages/Home";

import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailsPage, { loader as eventDetailsLoader, action as deleteEventAction } from './pages/EventDetails';
import NewEvent, { action as NewEventAction } from './pages/NewEvent';
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
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':id',
            loader: eventDetailsLoader,
            id: 'event-details',
            children: [
              {
                index: true, element: <EventDetailsPage />,
                action: deleteEventAction,
              },
              { path: "edit", element: <EditEvent />, },
            ]
          },
          { path: "new", element: <NewEvent />, action: NewEventAction },
        ],
      }

    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
