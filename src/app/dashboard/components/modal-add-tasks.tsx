'use client'

import Modal from "@/src/components/ui/modal"
import useLocalStorage from "@/src/lib/hooks/useLocalStorage"
import { useRef, useState } from "react"

interface ModalEditTasksProps {
  closeModal: () => void
  setIsUpdate: () => void
}

export default function ModalAddEditTasks({closeModal, setIsUpdate}: ModalEditTasksProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isRequestSending, setIsRequestSending] = useState(false)

  const timeInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)


  async function SendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    setIsRequestSending(true)
    
    if (textInputRef.current && timeInputRef.current) {
      await fetch("api/tasks", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "user-id": userIdLS
        },
        body: JSON.stringify({
          time: timeInputRef.current.value,
          text: textInputRef.current.value
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        closeModal()
        setIsUpdate()
      })
      .catch(error => {
        console.log(error.message)
        setIsRequestSending(false)
      })
    }
    setIsRequestSending(false)
  }

  function getTomorrowDate() {
    let today = new Date();
    let date = new Date(today);
    date.setDate(today.getDate() + 1);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    return `${currentDay < 10 ? "0" + currentDay : currentDay}.${currentMonth < 10 ? "0" + currentMonth : currentMonth}.${date.getFullYear().toString().slice(-2)}`;
  }
  

  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default">
      <p className="font-medium text-left text-sm opacity-80">Срок</p>
      <input type="text" placeholder="01.12.2024" defaultValue={getTomorrowDate()} ref={timeInputRef}
      className="w-full border rounded-md bg-input text-input-foreground 
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/>
      <p className="font-medium text-left mt-1 text-sm opacity-80">Что надо сделать?</p>
      <textarea rows={8} placeholder="text" ref={textInputRef}
      className="w-full border rounded-md bg-input text-input-foreground mb-1 px-0.5
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300"/>
      <button className="w-full font-medium rounded-md
      bg-button text-button-foreground hover:bg-button-hover transition-colors"
      onClick={SendRequest}>
        {isRequestSending ? (
          <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Sending...</span>
          </div>
        ) : "Сохранить"}
      </button>
    </div>
  );
}