import React from "react"
import { Link } from 'react-router-dom' 

function Navigation(){
    return(
        <>
        <Link to="/">home</Link><br/>
        <Link to="/walks">walks</Link><br/>
        <Link to="/bunnies">bunnies</Link><br/>
        <Link to="/paths">paths</Link><br/><br/>
        <Link to="/create/bunny">new bunny</Link><br/>
        <Link to="/create/path">new path</Link><br/>
        <Link to="/create/walk">new walk</Link>
        </>
    )
}

export default Navigation