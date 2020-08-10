import React from "react";
import "./App.css";
import { useAuth } from "./Hooks/useFirebase";

import AppEnhancer from "./AppEnhancer";
import Header from "./Components/Header";
import Loading from "./Components/Loading";
import { PublicRoutes, PrivateRoutes } from "./Routes";

function App(props) {
  const { user, loading } = useAuth();

  let renderSnap = <Loading />;
  if (!loading) {
    renderSnap = user ? <PrivateRoutes /> : <PublicRoutes />;
  }
  return (
    <div className="App bg-teal-dark text-teal-light min-h-screen pb-20 md:pb-auto overflow-auto">
      <Header />
      <section className="container mx-auto px-4 sm:px-0">{renderSnap}</section>
    </div>
  );
}

export default AppEnhancer(App);
