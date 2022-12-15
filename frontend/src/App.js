import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import CreateSpot from "./components/CreateSpot/createSpot";
import GetSpotDetails from "./components/GetSpotDetails/index";
import EditSpot from "./components/EditSpot/editSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route path="/spots/create">
            <CreateSpot />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route  path="/spots/:spotId">
            <GetSpotDetails />
          </Route>
          <Route  path="/spots">
            <AllSpots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
