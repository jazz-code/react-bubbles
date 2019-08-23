import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute"
import "./styles.scss";


function App() {
  const [colorList, setColorList] = useState([]);
  // const [color, setColor] = useState([]);


  // const getColor = () => {
  //   axios
  //     .get("http://localhost:5000/api/colors")
  //     .then(res => setColor(res.data))
  //     .catch(err => console.log(err.response));
  // };
     
  // const updateColor = updatedColor => {
  //       setColor(color.map(color => (
  //         color.id === updatedColor.id ? updatedColor : color
  //       )));
  //     };
  // render={props => {
  //   const colors = color.find(color => color.id == props.match.params.id);
  //   if (!colors) {
  //     return <div>Loading...</div>;
  //   }
  //   return <BubblePage {...props}
  //                      color={color}
  //                      updateColor={updateColor}
  //                      getColor={getColor}
  //          />;
  // }}/>

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubble-page" component={BubblePage}/>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
