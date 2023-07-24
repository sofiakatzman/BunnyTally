import React, { useState, useEffect } from "react"

function Paths(){
    const [paths, setPaths] = useState(null)
    
    useEffect(()=>{
        fetch("/paths")
        .then(r => r.json())
        .then(data =>setPaths(data))
        console.log(paths)
    }, [])

    return(
        <>
        {paths && paths.map(path=> {
            return(
                <div key={path.id}>
                    <h2>{path.name}</h2>
                    <h3>{path.directions}</h3>
                </div>
            )
        })}
        </>
    )
}

export default Paths