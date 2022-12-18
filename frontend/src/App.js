import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import CreateSpot from "./components/CreateSpot/createSpot";
import GetSpotDetails from "./components/GetSpotDetails/index";
import EditSpot from "./components/EditSpot/editSpot";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer/footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // write Footer
  return (
    <div className="container-page">
      <Navigation isLoaded={isLoaded} />
      <main id="content">
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
            <Route path="/spots/:spotId">
              <GetSpotDetails />
            </Route>
            <Route path="/spots">
              <AllSpots />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
