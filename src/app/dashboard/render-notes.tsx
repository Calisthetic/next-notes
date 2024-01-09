'use client'

import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function RenderNotes() {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  
  useEffect(() => {
    fetch("api/notes/last/4", {
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
    <div className="my-1 flex flex-col gap-x-1">
      {response ? response.map((item, index) => (
        <button key={index} className=" truncate text-start flex flex-row 
        hover:border-border border border-primary rounded px-0.5">
          <span className="truncate font-semibold">{item[2]}</span>
          <span className="text-icon mx-1 font-semibold">-</span>
          <span className="truncate opacity-80">{item[3]}</span>
        </button>
      )) : (
        <>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] my-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
        </>
      )}
    </div>
  );
}