"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function DashboardPage() {
  const router = useRouter();

  useEffect((e) => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");   // redirect if not logged in
    }
  }, []);
  const data=[];
  const fetchthedata=async()=>{
    const get=await axios.get('http://localhost:2000/article/displayarticle')
    console.log(get)
  }
  fetchthedata()

  return (
    <div>
      {data.map(item=>{
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.content}</div>
          <div>{item.author}</div>
          <div><img src={item.image}></img></div>
          </div>
      })}
    </div>
  );
}
