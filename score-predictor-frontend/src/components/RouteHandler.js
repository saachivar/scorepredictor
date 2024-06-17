import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "../Home";
import Survey from "../Survey";
import Results from "../Results";
import { AnimatePresence } from "framer-motion"
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path='/' element={< Home />}> </Route>  
        <Route exact path='/Survey' element={< Survey />}> </Route>  
        <Route exact path='/Results' element={< Results />}> </Route>  
      </Routes>
    </AnimatePresence>

  )

}