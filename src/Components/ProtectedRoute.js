import React, { useEffect, useState } from "react";
import { Navigate,Route } from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {

  const {currentUser} = useAuth();
  return(
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Navigate to="/login" />
      }}
      >

      </Route>
  )
}

export default PrivateRoute;