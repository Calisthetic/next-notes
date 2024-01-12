'use client'

import IconClose from "@/src/components/icons/icon-close";
import CheckButton from "@/src/components/ui/check-btn";
import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import ModalEditNotes, { SelectedNote } from "./modal-edit-notes";
import CheckButton2 from "@/src/components/ui/check-btn2";
import IconAdd from "@/src/components/icons/icon-add";

interface NotesModalProps {
  closeModal: () => void;
}

export default function NotesModal ({closeModal}: NotesModalProps) {
  const [notesResponse, setNotesResponse] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/notes", {
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
        setNotesResponse(data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate, userIdLS])
  
  const [isSelectedNoteModalOpen, setIsSelectedNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectedNote>()
  const [isRequestSending, setIsRequestSending] = useState(false)

  async function DeleteNote(deletingId:string) {
    setIsRequestSending(true)
    await fetch("api/notes/" + deletingId, {
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
      setIsUpdate(isUpdate)
      setIsRequestSending(false)
    })
    .catch(error => {
      console.log(error.message)
    })
    setIsRequestSending(false)
  }

  async function RestoreNote(id:string, title: string, text: string) {
    setIsRequestSending(true)
    await fetch("api/notes", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
      body: JSON.stringify({
        id: id,
        title: title,
        text: text
      })
    })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      setIsUpdate(isUpdate)
      setIsRequestSending(false)
    })
    .catch(error => {
      console.log(error.message)
    })
    setIsRequestSending(false)
  }
  
  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen sm:h-auto 
    relative overflow-y-auto overflow-x-hidden flex justify-center flex-col">
      {notesResponse ? (
        <>
          <div>
            <p className="text-lg font-medium">Заметки</p>
            {
              notesResponse.map((item, index) => (
                <div key={index} data-id={item[0]} className="rendered-note my-0.5 flex relative overflow-x-hidden transition-shadow rounded px-1">
                  <CheckButton2 defaultChecked={true} checkOff={() => DeleteNote(item[0])} 
                  checkOn={() => RestoreNote(item[0], item[2], item[3])}></CheckButton2>
                  <span className="ml-2 font-semibold">{item[2]}</span>
                  <span className="text-icon mx-1 font-semibold">-</span>
                  <button className="truncate hover:underline opacity-80 text-start flex flex-row rounded px-0.5"
                  onClick={() => {
                    setSelectedNote({
                      id: item[0],
                      title: item[2],
                      text: item[3]
                    } as SelectedNote);
                    setIsSelectedNoteModalOpen(true)
                  }}>
                    {item[3]}
                  </button>
                </div>
              ))
            }
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-medium">Заметки</p>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] my-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
        </div>
      )}
      <div className="flex mt-1 justify-center">
        <button className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary hover:opacity-80 transition-opacity"
        onClick={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}>
          <IconAdd classes="stroke-button w-7 h-7 transition-opacity"></IconAdd>
        </button>
      </div>
      <button className="w-full font-medium rounded-md mt-4
      bg-button text-button-foreground hover:bg-button-hover transition-colors"
      onClick={() => isRequestSending ? null : closeModal()}>
        {isRequestSending ? (
          <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        ) : "Сохранить"}
      </button>

      <Modal
      isOpen={isSelectedNoteModalOpen}
      setIsOpen={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}>
        <ModalEditNotes
          selectedNote={selectedNote}
          setIsUpdate={() => setIsUpdate(!isUpdate)}
          closeModal={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}
        />
      </Modal>
    </div>
  );
}