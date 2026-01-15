'use client'
import React from 'react'

const page = () => {

const fetch=async()=>{
const data=[]
const article=await axios.get('http://localhost:2000/article/displayarticle',data)
console.log(data)
}
  return (
    <div> 
      <div>

      </div>
    </div>
  )
}

export default page
