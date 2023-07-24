import React, { useEffect, useState } from "react"


function Walks(){
    const [walks, setWalks] = useState(null)
    
    useEffect(()=>{
        fetch("/walks")
        .then(r => r.json())
        .then(data =>setWalks(data))
    }, [])


    return(
        <>
        {walks && walks.map((walk)=> {
            return(
                <div key={walk.id}>
                    <h2>{walk.date} : {walk.bunny_count}</h2>
                    <h3>Walk Time: {walk.start_time} - {walk.end_time}</h3>
                    <h3>Walk Path: {walk.walk_path}</h3>
                </div>
            )
        })}
        </>
    )
}

export default Walks