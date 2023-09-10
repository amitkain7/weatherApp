import React, { useEffect, useState } from 'react'
import './Current.css'
function Currenttime() {
    const [time , setTime] = useState(new Date());
    const refershclock = () => {
        setTime(new Date());
    }

    useEffect(() => {
       const timerId = setInterval(refershclock , 1000);


    //  this is the cleanup funciton return by use effect hook when the components is unmounts
       const cleanup = () => {
        clearInterval(timerId)
       }

       return cleanup;
    }, [])
  
  return (
    <div className='time'>
         {time.toLocaleTimeString('en-IN')}
    </div>
  )
}

export default Currenttime