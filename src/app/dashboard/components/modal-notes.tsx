'use client'

import IconClose from "@/src/components/icons/icon-close";
import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import ModalAddEditNotes, { SelectedNote } from "./modal-add-edit-notes";
import CheckButton2 from "@/src/components/ui/check-btn2";
import IconAdd from "@/src/components/icons/icon-add";

interface NotesModalProps {
  closeModal: () => void;
}

export default function NotesModal ({closeModal}: NotesModalProps) {
  const [notesResponse, setNotesResponse] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState(true)
  const [isNewNotes, setIsNewNotes] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/notes?type=" + (isNewNotes ? "new" : "old"), {
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
        setNotesResponse(undefined)
        setTimeout(() => {
          setNotesResponse(data.data)
        }, 1);
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate, userIdLS, isNewNotes])
  
  const [isSelectedNoteModalOpen, setIsSelectedNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectedNote>()

  async function PatchArchiveNote(deletingId:string) {
    await fetch("api/notes/archive/" + deletingId, {
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
      setIsUpdate(isUpdate)
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  
  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen sm:h-auto 
    relative overflow-y-auto overflow-x-hidden flex justify-center flex-col">
      {notesResponse ? (
        <div className="relative">
          <button className="absolute top-0 left-[calc(100%-20px)] child-hover:stroke-primary-foreground"
          onClick={closeModal}>
            <IconClose classes="w-4 h-4 stroke-border transition hover:opacity-70"></IconClose>
          </button>
          <button className="text-lg font-medium hover:underline"
          onClick={() => setIsNewNotes(!isNewNotes)}>
            {isNewNotes ? "Недавние заметки" : "Заметки в архиве"}
          </button>
          {
            notesResponse.length === 0 ? (
              <div className="my-1 font-medium text-secondary-foreground">Заметок нет...</div>
            ) : notesResponse.map((item, index) => (
              <div key={index} data-id={item[0]} className="my-0.5 
              items-center flex relative overflow-x-hidden transition-shadow rounded px-1">
                <div className="flex items-center h-full justify-center mr-1">
                  <CheckButton2 defaultChecked={item[4] === "0"} checkOff={() => PatchArchiveNote(item[0])} 
                  checkOn={() => PatchArchiveNote(item[0])}></CheckButton2>
                </div>
                <div className="flex flex-col items-start">
                  <span className="px-0.5 text-start truncate max-w-[240px] font-semibold">{item[2]}</span>
                  <button className="flex flex-col px-0.5 items-start hover:underline transition-opacity"
                  onClick={() => {
                    setSelectedNote({
                      id: item[0],
                      title: item[2],
                      text: item[3]
                    } as SelectedNote);
                    setIsSelectedNoteModalOpen(true)
                  }}>
                    <span className="truncate max-w-[240px] opacity-80">{item[3]}</span>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-medium">Недавние заметки</p>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] my-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
        </div>
      )}
      <div className="flex mt-2 justify-center">
        <button className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary hover:opacity-80 transition-opacity"
        onClick={() => {
          setSelectedNote(undefined)
          setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)
        }}>
          <IconAdd classes="fill-button w-6 h-6 transition-opacity"></IconAdd>
        </button>
      </div>

      <Modal
      isOpen={isSelectedNoteModalOpen}
      setIsOpen={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}>
        <ModalAddEditNotes
          selectedNote={selectedNote}
          setIsUpdate={() => setIsUpdate(!isUpdate)}
          closeModal={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}
        />
      </Modal>
    </div>
  );
}