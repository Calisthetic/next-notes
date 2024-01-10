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
  }, [isUpdate, update])

  function ManageTask(taskId:string) {
    fetch("api/tasks/manage/"+taskId, {
      method: 'PATCH',
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
      {response ? response.map((item) => (
        <div key={item[0]} className="flex ml-0.5 flex-row md:flex-nowrap my-0.5 gap-x-1 transition-opacity items-center">
          <CheckButton defaultChecked={item[5] === "1" ? true : false} 
          checkOn={() => ManageTask(item[0])} checkOff={() => ManageTask(item[0])}></CheckButton>
          <span className="opacity-80 font-semibold ml-1">{item[3]}</span>
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