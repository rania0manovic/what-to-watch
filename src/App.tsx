import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./components/layouts/ClientLayout.tsx";
import HomePage from "./components/modules/home-page/HomePage.tsx";
import React from "react";
import MediaDetails from "./components/modules/media-details/MediaDetails.tsx";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="media-details/:tab/:id" index element={<MediaDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
