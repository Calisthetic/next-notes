'use client'

import useLocalStorage from "@/src/lib/hooks/useLocalStorage"
import { useRef, useState } from "react"

interface ModalAddEditBirthdaysProps {
  selectedBirthday?: SelectedBirthday
  closeModal: () => void
  setIsUpdate: () => void
}
export interface SelectedBirthday {
  id: string
  name: string
  date: string
  description: string
}

export default function ModalAddEditBirthdays({selectedBirthday, closeModal, setIsUpdate}: ModalAddEditBirthdaysProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isRequestSending, setIsRequestSending] = useState(false)

  const dateInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
  
  async function SendRequest() {
    setIsRequestSending(true)

    if (!dateInputRef.current || dateInputRef.current.value.length < 9
    || !nameInputRef.current || nameInputRef.current.value.length < 0
    || !descriptionInputRef.current) {
      return
    } else {
      await fetch("api/birthdays", {
        method: selectedBirthday ? 'PATCH' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "user-id": userIdLS
        },
        body: JSON.stringify({
          id: selectedBirthday ? selectedBirthday.id : null,
          name: nameInputRef.current.value,
          date: dateInputRef.current.value,
          description: descriptionInputRef.current.value
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
      })
    }
    setIsRequestSending(false)
  }

  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default">
      <p className="font-medium text-left text-sm opacity-80">Дата</p>
      <input type="text" placeholder={new Date().toLocaleDateString()} defaultValue={selectedBirthday?.date} ref={dateInputRef}
      className="w-full border rounded-md bg-input text-input-foreground 
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/>
      <p className="font-medium text-left text-sm opacity-80">Имя</p>
      <input type="text" placeholder="name" defaultValue={selectedBirthday?.name} ref={nameInputRef}
      className="w-full border rounded-md bg-input text-input-foreground 
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/>
      <p className="font-medium text-left mt-1 text-sm opacity-80">Описание</p>
      <textarea rows={4} placeholder="description" defaultValue={selectedBirthday?.description} ref={descriptionInputRef}
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