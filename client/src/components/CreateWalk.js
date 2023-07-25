import React, { useState, useEffect } from "react"
import moment from "moment"
import { useFormik } from 'formik'
import * as yup from 'yup'

function CreateWalk() {
  // State variables
  const [walk, setWalk] = useState(false)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [paths, setPaths] = useState(null)
  const [count, setCount] = useState(1)

  useEffect(() => {
    fetch("/paths")
      .then(r => r.json())
      .then(data => setPaths(data))
  }, [])

  // Form validation schema
  const formSchema = yup.object().shape({
    walk_path: yup.number().required('You must select a path.'),
    bunny_count: yup.number().positive('You must save at least one bunny to your walk.'),
  })

  const formik = useFormik({
    initialValues: {
      date: "",
      start_time: "",
      end_time: "",
      bunny_count: "",
      walk_path: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      values.end_time = moment().format('LT')
      values.start_time = startTime
      values.bunny_count = count
      values.date = date
          
      fetch('/walks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then((res) => {
        if (res.ok) {
          res.json().then((response) => {
            console.log(response) 
          })
        } else {
          console.error("Failed to save the walk.")
        }
      })
      .catch((error) => {
        console.error("Error occurred while saving the walk:", error)
      })
      setWalk(!walk)
    },
  })

  const handleStartWalk = () => {
    setWalk(!walk)
    setStartTime(moment().format('LT'))
    setDate(moment().format('l'))
  }

  // Display when a walk has not been started
  if (!walk) {
    return (
      <div> <br/>
        <button onClick={handleStartWalk}>Start Walk</button>
      </div>
    )
  }

  // Display when a walk has been started
  return (
    <div> <br/>
      <h2>{count} bunnies seen!</h2>
      <h3>walk date: {date}</h3>
      <h3>walk start time: {startTime}</h3>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="walk_path"
          value={formik.values.walk_path}
          onChange={formik.handleChange}
        >
          <option value="">Select a path</option>
          {paths && paths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.name.toLowerCase()}
            </option>
          ))}
        </select>



        {/* formik error handling in case there were issues storing values -- shouldnt be triggered */}
        {formik.errors && (
          <div className="errors">
            <ul>
              {Object.values(formik.errors).map((error, index) => (
                <h6 key={index} style={{ color: 'red' }}>{error}</h6>
              ))}
            </ul>
          </div>
        )}
        <br/>
        <button type="submit">save walk</button>
      </form>
    </div>
  )
}

export default CreateWalk
