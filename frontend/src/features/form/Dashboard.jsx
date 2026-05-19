 import React from 'react'
import { Link } from 'react-router'
//https://assignment-5skg.onrender.com/api/dashboard
// use react chart 
 
 const Dashboard = () => {
   return (
     <div>
       <Link to='/query'><button>submit your query</button></Link>
       <Link to='/detail' ><button>total provider</button></Link>
       <Link to = '/user'><button>check status</button></Link>



     </div>
   )
 }
 
 export default Dashboard
 