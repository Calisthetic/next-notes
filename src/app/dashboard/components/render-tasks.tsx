'use client'

import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

interface RenderTasksProps {
  update: boolean
}

export default function RenderTasks({update}:RenderTasksProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
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
    }
    fetchData()
  }, [isUpdate, userIdLS, update])

  function RestoreTask(taskId:string, time:string, text:string) {
    fetch("api/tasks", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
      body: JSON.stringify({
        id: taskId,
        time: time,
        text: text
      })
    })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      //setIsUpdate(isUpdate)
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  function DeleteTask(taskId:string) {
    fetch("api/tasks/"+taskId, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
    })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      //setIsUpdate(isUpdate)
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  
  return (
    <div className="my-1">
      {response ? response.length === 0 ? (
        <p className="font-medium text-start">Заданий пока что нет...</p>
      ) : response.map((item) => (
        <div key={item[0]} className="flex ml-0.5 flex-row md:flex-nowrap my-0.5 gap-x-1 transition-opacity">
          <div className="mt-0.5">
            <CheckButton defaultChecked={item[4] === "1" ? true : false} checkOn={() => DeleteTask(item[0])}
            checkOff={() => RestoreTask(item[0], item[2], item[3])}></CheckButton>
          </div>
          <div className="flex flex-col ml-1 sm:flex-row max-w-[calc(100%-30px)] sm:max-w-[calc(100%-30px)]">
            <span className="opacity-80 sm:mr-2 font-semibold">{item[2]}</span>
            <span>{item[3]}</span>
          </div>
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