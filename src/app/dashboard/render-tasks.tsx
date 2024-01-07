'use client'

import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function RenderTasks() {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  
  useEffect(() => {
    fetch("api/tasks/last/4", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Wrong data')
      }
      return res.json();
    })
    .then(data => {
      setResponse(data.data)
    })
    .catch(error => {
      console.log(error.message)
    })
  })
  
  return (
    <div className="my-1 ml-1">
      {response ? response.map((item, index) => (
        <div key={index} className="flex flex-row flex-wrap: md:flex-nowrap gap-x-1">
          <span className="opacity-80 font-semibold">{item[3]}</span>
          <span className="mx-1">-</span>
          <span>{item[2]}</span>
        </div>
      )) : (
        <>
          <div className="h-2.5 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] mb-2.5"></div>
          <div className="h-2.5 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-2.5 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-2.5 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
          <div className="h-2.5 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px]"></div>
        </>
      )}
    </div>
  );
}