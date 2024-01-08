'use client'

import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function RenderTasks() {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
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
  }, [isUpdate])

  function CompleteTask(taskId:string) {
    const el:HTMLDivElement|null = document.querySelector('[data-id="' + taskId + '"]')
    if (el) {
      setTimeout(() => {
        el.style.opacity = "0%"
      }, 300);
      setTimeout(() => {
        el.remove()
      }, 500);
    }
    fetch("api/tasks/complete/"+taskId, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Error...')
      }
      return res.json();
    })
    .then(() => {
      setIsUpdate(isUpdate)
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  
  return (
    <div className="my-1 ml-1">
      {response ? response.map((item) => (
        <div key={item[0]} data-id={item[0]} className="flex flex-row flex-wrap: md:flex-nowrap gap-x-1 transition-opacity">
          <CheckButton checkOn={() => CompleteTask(item[0])}></CheckButton>
          <span className="opacity-80 font-semibold">{item[3]}</span>
          <span className="mx-1">-</span>
          <span>{item[2]}</span>
        </div>
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