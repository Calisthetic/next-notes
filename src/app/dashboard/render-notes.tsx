'use client'

import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useRef, useState } from "react";


interface RenderNotesProps {
  count?: number
}

export default function RenderNotes({count}:RenderNotesProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/notes/last/" + (count ? count : "4"), {
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
  }, [isUpdate])



  interface SelectedNote {
    id: string
    title: string
    text: string
  }
  const [isSelectedNoteModalOpen, setIsSelectedNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectedNote>()
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
        setIsSelectedNoteModalOpen(false)
        setIsUpdate(!isUpdate)
      })
      .catch(error => {
        console.log(error.message)
        setIsRequestSending(false)
      })
    }
    setIsRequestSending(false)
  }

  return (
    <div className="my-1 flex flex-col gap-x-1">
      {response ? response.map((item, index) => (
        <button key={index} className="truncate text-start flex flex-row rounded px-0.5"
        onClick={() => {
          setSelectedNote({
            id: item[0],
            title: item[2],
            text: item[3]
          } as SelectedNote);
          setIsSelectedNoteModalOpen(true)
        }}>
          <span className="font-semibold">{item[2]}</span>
          <span className="text-icon mx-1 font-semibold">-</span>
          <span className="truncate opacity-80">{item[3]}</span>
        </button>
      )) : (
        <>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] my-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
        </>
      )}

      <Modal
      isOpen={isSelectedNoteModalOpen}
      setIsOpen={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}>
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
      </Modal>
    </div>
  );
}