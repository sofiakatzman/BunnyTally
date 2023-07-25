import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" // Import Routes

import Home from "./Home"
import Navigation from "./Navigation"
import Walks from "./Walks"
import Bunnies from "./Bunnies"
import Paths from "./Paths"
import CreatePath from "./CreatePath"
import CreateBunny from "./CreateBunny"
import CreateWalk from "./CreateWalk"

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/walks" element={<Walks />} />
          <Route path="/bunnies" element={<Bunnies />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/create/path" element={<CreatePath />} />
          <Route path="/create/bunny" element={<CreateBunny />} />
          <Route path="/create/walk" element={<CreateWalk />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App