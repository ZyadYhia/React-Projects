import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/Root";
import EventRoot from "./layout/EventRoot";
import HomePage from "./pages/Home";

import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailsPage, { loader as eventDetailsLoader, action as deleteEventAction } from './pages/EventDetails';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import Error from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm'

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
              { path: "edit", element: <EditEvent />, action: manipulateEventAction },
            ]
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manipulateEventAction
          },
        ],
      },

      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
