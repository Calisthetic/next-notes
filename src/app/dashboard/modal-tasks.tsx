'use client'

import IconClose from "@/src/components/icons/icon-close";
import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

interface TasksModalProps {
  closeModal: () => void;
}

export default function TasksModal ({closeModal}: TasksModalProps) {
  const [tasksResponse, setTasksResponse] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/tasks", {
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
        setTasksResponse(data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate])

  async function ManageTask(taskId:string) {
    fetch("api/tasks/manage/" + taskId, {
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
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen h-screen sm:h-auto 
    relative overflow-y-auto flex justify-between flex-col">
      {tasksResponse ? (
        <>
          <div>
            <p className="text-lg font-medium">Задания</p>
            {
              tasksResponse.map((item) => (
                <div className="flex items-center flex-row my-0.5">
                  <CheckButton defaultChecked={item[5] === "1"} 
                  checkOn={() => ManageTask(item[0])} checkOff={() => ManageTask(item[0])}></CheckButton>
                  <span className="opacity-80 font-semibold ml-1">{item[3]}</span>
                  <span className="mx-1">-</span>
                  <span>{item[2]}</span>
                </div>
              ))
            }
          </div>
          <button className="sm:hidden bg-button text-button-foreground rounded-md py-0.5 mt-2 w-full"
          onClick={closeModal}>Сохранить</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}