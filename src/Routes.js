import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useUI } from "./Context/useUiReducer";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import WritePost from "./Components/CreatePost/WritePost";

// PUBLIC PAGES
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Modal from "./UI/Modal";

export const PrivateRoutes = props => {
  const { isPostModalOpen, postModalToggler } = useUI();
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Posts />
          {/* <Home /> */}
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      {/* Render WRITE POST MODAL */}
      <Modal isOpen={isPostModalOpen} closeHandler={postModalToggler}>
        <WritePost isShow={isPostModalOpen} closeHandler={postModalToggler} />
      </Modal>
    </>
  );
};
export const PublicRoutes = props => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};
