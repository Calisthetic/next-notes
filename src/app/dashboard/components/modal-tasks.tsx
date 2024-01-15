'use client'

import IconAdd from "@/src/components/icons/icon-add";
import IconClose from "@/src/components/icons/icon-close";
import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import ModalAddEditTasks from "./modal-add-tasks";
import Modal from "@/src/components/ui/modal";

interface TasksModalProps {
  closeModal: () => void;
}

export default function TasksModal ({closeModal}: TasksModalProps) {
  const [tasksResponse, setTasksResponse] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState(true)
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
  
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
  }, [isUpdate, userIdLS])

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
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen sm:h-auto 
    relative overflow-y-auto flex justify-center flex-col">
      <div className="relative">
        <button className="absolute top-0 left-[calc(100%-20px)] child-hover:stroke-primary-foreground"
        onClick={closeModal}>
          <IconClose classes="w-4 h-4 stroke-border transition hover:opacity-70"></IconClose>
        </button>
        <p className="text-lg font-medium">Задания</p>
        {tasksResponse ? tasksResponse.map((item) => (
          <div key={item[0]} className="flex items-center flex-row my-0.5">
            <CheckButton defaultChecked={item[4] === "1"} checkOn={() => DeleteTask(item[0])} 
            checkOff={() => RestoreTask(item[0], item[2], item[3])}></CheckButton>
            <span className="opacity-80 font-semibold ml-2">{item[2]}</span>
            <span className="mx-1">-</span>
            <span>{item[3]}</span>
          </div>
        )) : (
          <p className=" text-lg font-medium">Loading...</p>
        )}
        <button className="sm:hidden bg-button text-button-foreground rounded-md py-0.5 mt-2 w-full"
        onClick={closeModal}>Сохранить</button>
        <div className="flex mt-2 justify-center">
          <button className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary hover:opacity-80 transition-opacity"
          onClick={() => setIsNewTaskModalOpen(!isNewTaskModalOpen)}>
            <IconAdd classes="fill-button w-6 h-6 transition-opacity"></IconAdd>
          </button>
        </div>
      </div>

      <Modal
      isOpen={isNewTaskModalOpen}
      setIsOpen={() => setIsNewTaskModalOpen(!isNewTaskModalOpen)}>
        <ModalAddEditTasks
          setIsUpdate={() => setIsUpdate(!isUpdate)}
          closeModal={() => setIsNewTaskModalOpen(!isNewTaskModalOpen)}
        />
      </Modal>
    </div>
  );
}