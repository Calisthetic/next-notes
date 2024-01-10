'use client'

import useLocalStorage from "@/src/lib/hooks/useLocalStorage"
import { useRef, useState } from "react"

interface ModalEditNotesProps {
  selectedNote?: SelectedNote
  closeModal: () => void
  setIsUpdate: () => void
}
export interface SelectedNote {
  id: string
  title: string
  text: string
}

export default function ModalEditNotes({selectedNote, closeModal, setIsUpdate}: ModalEditNotesProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isRequestSending, setIsRequestSending] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)


  async function SendRequest() {
    setIsRequestSending(true)
    
    if (textInputRef.current && titleInputRef.current && selectedNote) {
      await fetch("api/notes", {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "user-id": userIdLS
        },
        body: JSON.stringify({
          id: selectedNote.id,
          title: titleInputRef.current.value,
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

  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default">
      <p className="font-medium text-left text-sm opacity-80">Название</p>
      <input type="text" placeholder="title" defaultValue={selectedNote?.title} ref={titleInputRef}
      className="w-full border rounded-md bg-input text-input-foreground 
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/>
      <p className="font-medium text-left mt-1 text-sm opacity-80">Содержимое</p>
      <textarea rows={8} placeholder="text" defaultValue={selectedNote?.text} ref={textInputRef}
      className="w-full border rounded-md bg-input text-input-foreground mb-1 px-0.5
      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300"/>
      <button className="w-full font-medium rounded-md
      bg-button text-button-foreground hover:bg-button-hover transition-colors"
      onClick={SendRequest}>
        {isRequestSending ? (
          <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        ) : "Сохранить"}
      </button>
    </div>
  );
}