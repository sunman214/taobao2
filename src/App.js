import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import Header from "./component/Header/header";
import MainPages from "./component/MainPages/pages";
import {DataProvider} from './GlobalState'

function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Header/>
          <MainPages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
