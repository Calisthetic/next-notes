'use client'

import IconClose from "@/src/components/icons/icon-close";
import Modal from "@/src/components/ui/modal";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import IconAdd from "@/src/components/icons/icon-add";
import ModalAddEditBirthdays, { SelectedBirthday } from "./modal-add-edit-birthdays";
import CheckButton from "@/src/components/ui/check-btn";
import IconRemove from "@/src/components/icons/icon-remove";

interface BirthdaysModalProps {
  closeModal: () => void;
}

export default function BirthdaysModal ({closeModal}: BirthdaysModalProps) {
  const [birthdaysResponse, setBirthdaysResponse] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState<boolean>(true)
  const [pageNumber, setPageNumber] = useState<number>(0)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/birthdays/pages/" + pageNumber, {
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
        setBirthdaysResponse(data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate, userIdLS, pageNumber])

  async function DeleteBirthday(id:string) {
    await fetch("api/birthdays/" + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  async function RestoreBirthday(id:string, name:string, date:string, description:string) {
    await fetch("api/birthdays", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
      body: JSON.stringify({
        id: id,
        name: name,
        date: date,
        description: description,
      })
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const [isNewBirthdayModalOpen, setIsNewBirthdayModalOpen] = useState(false)
  const [selectedBirthday, setSelectedBirthday] = useState<SelectedBirthday>()

  return (
    <div className="bg-primary px-2 py-3 sm:p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-[calc(80vh)] sm:h-auto 
     oveflow-y-auto overflow-x-hidden flex  flex-col">
      {birthdaysResponse ? (
        <div className="relative">
          <p className=" text-lg font-medium">Днюхи</p>
          <button className="absolute top-0 left-[calc(100%-20px)] child-hover:stroke-primary-foreground"
          onClick={closeModal}>
            <IconClose classes="w-4 h-4 stroke-border transition hover:opacity-70"></IconClose>
          </button>
          <div className="absolute top-0 left-0 text-secondary-foreground child:px-0.5">
            <button className="child-hover:fill-primary-foreground"
            onClick={() => setPageNumber(pageNumber === 0 ? 0 : pageNumber - 1)}>
              <IconRemove classes="w-5 h-5 fill-border transition hover:opacity-70"></IconRemove>
            </button>
            <button className="child-hover:fill-primary-foreground"
            onClick={() => setPageNumber((birthdaysResponse && birthdaysResponse.length !== 12) ? pageNumber : pageNumber + 1)}>
              <IconAdd classes="w-5 h-5 fill-border transition hover:opacity-70"></IconAdd>
            </button>
          </div>
          {
            birthdaysResponse.map((item, index) => (
              <div key={index} data-id={item[0]} className="my-0.5 
              items-start flex relative overflow-x-hidden transition-shadow rounded px-1">
                <div className="pt-0.5 pr-0.5 flex items-center h-full justify-center">
                  <CheckButton defaultChecked={true} checkOff={() => DeleteBirthday(item[0])} 
                  checkOn={() => RestoreBirthday(item[0], item[2], item[3], item[4])}></CheckButton>
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex flex-row items-start font-semibold">
                    <span className="opacity-80 w-20 mx-1 text-start">{item[3]}</span>
                    <button className="text-start truncate max-w-[50vw] hover:underline"
                    onClick={() => {
                      setSelectedBirthday({
                        id: item[0],
                        name: item[2],
                        date: item[3],
                        description: item[4]
                      } as SelectedBirthday);
                      setIsNewBirthdayModalOpen(true)
                    }}>{item[2]}</button>
                  </div>
                  <span className="truncate max-w-[240px] opacity-80 mx-1 text-wrap text-start ml-2">{item[4]}</span>
                </div>
              </div>
            ))
          }
          {(birthdaysResponse && birthdaysResponse.length < 12) ? (
            Array(12 - birthdaysResponse.length).fill('').map((_, index) => (
              <div key={index} className="rendered-note h-6 my-0.5 flex justify-center font-medium
              items-start relative overflow-x-hidden transition-shadow rounded px-1 text-secondary-foreground">
                {index === 0 ? "Днюх больше нет..." : null}
              </div>
            ))
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="text-xl font-medium">Днюхи</p>
          {
            Array(12).fill('').map((_, index) => (
              <div key={index} className="h-6 flex items-center">
                <div key={index} style={{width: `${Math.floor(Math.random() * 40 + 60)}%`}} 
                className="h-3 bg-secondary opacity-80 rounded-full animate-pulse"></div>
              </div>
            ))
          }
        </div>
      )}
      <div className="flex mt-2 justify-center">
        <button className="w-7 h-7 rounded-full flex justify-center items-center bg-secondary hover:opacity-80 transition-opacity"
        onClick={() => {
          setIsNewBirthdayModalOpen(!isNewBirthdayModalOpen)
        }}>
          <IconAdd classes="fill-button w-6 h-6 transition-opacity"></IconAdd>
        </button>
      </div>

      <Modal
      isOpen={isNewBirthdayModalOpen}
      setIsOpen={() => setIsNewBirthdayModalOpen(!isNewBirthdayModalOpen)}>
        <ModalAddEditBirthdays
          selectedBirthday={selectedBirthday}
          setIsUpdate={() => setIsUpdate(!isUpdate)}
          closeModal={() => setIsNewBirthdayModalOpen(!isNewBirthdayModalOpen)}
        />
      </Modal>
    </div>
  );
}