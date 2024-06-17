import * as React from "react";
import Home from "./Home"
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import RouteHandler from "./components/RouteHandler.js"
import "./index.css";
import "./App.css"
import Survey from "./Survey";
import Results from "./Results";


export default function App() {
    const location = useLocation();
    return (
        <Routes>  
            <Route exact path='/' element={< Home />}> </Route>  
            <Route exact path='/Survey' element={< Survey />}> </Route>  
            <Route exact path='/Results' element={< Results />}> </Route>  
        </Routes>  
    );
  }