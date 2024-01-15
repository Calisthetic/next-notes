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

export default function ModalAddEditNotes({selectedNote, closeModal, setIsUpdate}: ModalEditNotesProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isRequestSending, setIsRequestSending] = useState(false)
  const [isDeleteRequestSending, setIsDeleteRequestSending] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)


  async function PatchNote(e: React.MouseEvent<HTMLButtonElement>) {
    setIsRequestSending(true)
    
    if (textInputRef.current && textInputRef.current.value.length > 0 && 
    titleInputRef.current && textInputRef.current.value.length > 0) {
      await fetch("api/notes", {
        method: selectedNote ? 'PATCH' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "user-id": userIdLS
        },
        body: JSON.stringify({
          id: selectedNote ? selectedNote.id : null,
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
  
  async function DeleteNote(e: React.MouseEvent<HTMLButtonElement>) {
    setIsDeleteRequestSending(true)
    
    await fetch("api/notes/" + selectedNote?.id, {
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
      closeModal()
      setIsUpdate()
    })
    .catch(error => {
      console.log(error.message)
      setIsDeleteRequestSending(false)
    })
    setIsDeleteRequestSending(false)
  }

  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default">
      {selectedNote ? (
        <button className="w-full font-medium rounded-md mb-1.5
        bg-secondary text-secondary-foreground hover:text-primary-foreground transition-colors duration-300"
        onClick={DeleteNote}>
          {isDeleteRequestSending ? (
            <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Deleting...</span>
            </div>
          ) : "Удалить?"}
        </button>
      ) : null}
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
      onClick={PatchNote}>
        {isRequestSending ? (
          <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Sending...</span>
          </div>
        ) : "Сохранить"}
      </button>
    </div>
  );
}