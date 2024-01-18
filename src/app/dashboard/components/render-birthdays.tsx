'use client'

import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

interface RenderBirthdaysProps {
  update: boolean
}


export default function RenderBirthdays({update}: RenderBirthdaysProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/birthdays/next/4", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user-id": userIdLS
        },
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setResponse(data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate, userIdLS, update])

  return (
    <div className="my-1">
      {response ? response.length === 0 ? (
        <p className="font-medium text-start">Днюх пока что нет...</p>
      ) : response.map((item, index) => (
        <div key={index} className="flex flex-row flex-wrap: md:flex-nowrap gap-x-1">
          <span className="opacity-80 font-semibold">{item[3]}</span>
          <span>{item[2]}</span>
        </div>
      )) : (
        <>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] mt-3"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mt-3"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mt-3"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mt-3"></div>
        </>
      )}
    </div>
  );
}