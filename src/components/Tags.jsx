import React from 'react'
import '../style/tags.css'
import { Link } from "react-router-dom";

export default function Tags() {
  return (
    <div className='tags'>

      <Link to="/">
        <button>Add Task</button>
      </Link>

      <Link to="/tasks">
        <button>All Tasks</button>
      </Link>
        
      <Link to="/archive">
        <button>Archive</button>
      </Link>  

      


    </div>
  )
}

export {Tags};
