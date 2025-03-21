import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import Homepage from './Components/HomePage/homepage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Notifications from "./Notifications";
import GovtSchemes from "./GovtSchemes";
import CommunityForum from "./CommunityForum";
import PitchDeck from "./PitchDeck";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/Homepage",
      element: <Homepage />
    },
    {
      path: "/Profile",
      element: <Profile />
    },
    {
      path: "/Notifications",
      element: <Notifications />
    },
    {
      path: "/GovtSchemes",
      element: <GovtSchemes />
    },
    {
      path: "/CommunityForum",
      element: <CommunityForum />
    },
    {
      path: "/PitchDeck",
      element: <PitchDeck />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;