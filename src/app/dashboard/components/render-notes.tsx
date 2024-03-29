'use client'

import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import ModalEditNotes, { SelectedNote } from "./modal-add-edit-notes";


interface RenderNotesProps {
  update: boolean
}

export default function RenderNotes({update}:RenderNotesProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/notes/last/4", {
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
  }, [isUpdate, userIdLS, update])


  const [isSelectedNoteModalOpen, setIsSelectedNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SelectedNote>()

  return (
    <div className="my-1 flex flex-col gap-x-1">
      {response ? response.length === 0 ? (
        <p className="font-medium text-start">Заметок пока что нет...</p>
      ) : response.map((item, index) => (
        <div key={index} data-id={item[0]} className="rendered-note relative overflow-x-hidden transition-shadow rounded px-1">
          <span className="font-semibold">{item[2]}</span>
          <button className="truncate hover:underline opacity-80 text-start flex flex-row rounded"
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
        <ModalEditNotes
          selectedNote={selectedNote}
          setIsUpdate={() => setIsUpdate(!isUpdate)}
          closeModal={() => setIsSelectedNoteModalOpen(!isSelectedNoteModalOpen)}
        />
      </Modal>
    </div>
  );
}