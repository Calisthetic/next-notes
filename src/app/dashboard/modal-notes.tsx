'use client'

import IconClose from "@/src/components/icons/icon-close";
import CheckButton from "@/src/components/ui/check-btn";
import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import ModalEditNotes, { SelectedNote } from "./modal-edit-notes";

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

  async function ManageTask(taskId:string) {
    fetch("api/notes/manage/" + taskId, {
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
  
  const [isSelectedNoteModalOpen, setIsSelectedNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectedNote>()
  
  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen h-[calc(100vh-12px)] sm:h-auto 
    relative overflow-y-auto flex justify-between flex-col">
      {notesResponse ? (
        <>
          <div>
            <p className="text-lg font-medium">Заметки</p>
            {
              notesResponse.map((item, index) => (
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
      <button className="sm:hidden bg-button text-button-foreground rounded-md py-0.5 mt-2 w-full"
      onClick={closeModal}>Сохранить</button>

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