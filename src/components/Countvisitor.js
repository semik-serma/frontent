import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
const Countvisitor = () => {
    const [visitor,setvisitor]=useState(500)
    const [count,setcount]=useState(1)
    const visitorcountpost=async()=>{
        const result=await axios.post('http://localhost:2000',{
            visitor:crypto.randomUUID()
        })
        console.log(result)
    }
    const visitcount=async()=>{
        const result=await axios.get('http://localhost:2000')
        setvisitor(result.data.data)
    }
    // useEffect(()=>{
    // visitorcountpost()
    // },[count])
    useEffect(()=>{
        visitcount()
    },[])
  return (
    <div>
      Total views {visitor}
    </div>
  )
}

export default Countvisitor
