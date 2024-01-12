'use client'

import IconBirthday from "@/src/components/icons/icon-birthday";
import IconCart from "@/src/components/icons/icon-cart";
import IconNotes from "@/src/components/icons/icon-notes";
import IconTasks from "@/src/components/icons/icon-tasks";
import ReadMoreButton from "@/src/components/ui/read-more-btn";
import RenderBirthdays from "./components/render-birthdays";
import RenderTasks from "./components/render-tasks";
import RenderProducts from "./components/render-products";
import RenderNotes from "./components/render-notes";
import Modal from "@/src/components/ui/modal";
import { useEffect, useState } from "react";
import ProductsModal from "./components/modal-products";
import TasksModal from "./components/modal-tasks";
import NotesModal from "./components/modal-notes";

interface SelectedNote {
  id: string
  title: string
  text: string
}

export default function Dashboars () {
  const [isBirthdaysModalOpen, setIsBirthdaysModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [shouldProductsUpdate, setShouldProductsUpdate] = useState(false);
  const [shouldNotesUpdate, setShouldNotesUpdate] = useState(false);
  
  useEffect(() => {
    if (!isProductsModalOpen) {
      setShouldProductsUpdate(shouldProductsUpdate => !shouldProductsUpdate);
    }
  }, [isProductsModalOpen, setShouldProductsUpdate]);
  useEffect(() => {
    if (!isNotesModalOpen) {
      setShouldNotesUpdate(shouldNotesUpdate => !shouldNotesUpdate);
    }
  }, [isNotesModalOpen, setShouldNotesUpdate]);



  return (
    <div className="flex justify-center w-full px-2 pt-2">
      <div className="flex justify-center flex-col w-full max-w-5xl gap-y-2 md:gap-y-4">
        <div className="flex justify-between w-full flex-col sm:flex-row gap-y-2
        child:outline-1 child:border-b sm:child:outline child:outline-border sm:child:rounded-xl
        child:py-2 sm:child:py-0.5 sm:child:border-none child:p-0 sm:child:p-1">
          <div className="w-full sm:w-[calc(40%-4px)] md:w-[calc(30%-8px)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-x-2">
                <IconBirthday classes="h-8 w-8 fill-icon"></IconBirthday>
                <p className=" text-lg font-medium">Ближайшие днюхи</p>
              </div>
              <div className="ml-1">
                <RenderBirthdays></RenderBirthdays>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton onClick={() => setIsBirthdaysModalOpen(!isBirthdaysModalOpen)}></ReadMoreButton>
            </div>
          </div>
          <div className="w-full sm:w-[calc(60%-4px)] md:w-[calc(70%-8px)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-x-2">
                <IconTasks classes="h-8 w-8 stroke-icon"></IconTasks>
                <p className=" text-lg font-medium">Задания</p>
              </div>
              <div className="ml-1">
                <RenderTasks update={isTasksModalOpen}></RenderTasks>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton onClick={() => setIsTasksModalOpen(!isTasksModalOpen)}></ReadMoreButton>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row-reverse gap-y-2
        child:outline-1 first:child:border-b sm:child:outline child:outline-border sm:child:rounded-lg
        child:py-2 sm:child:py-0.5 sm:child:border-none child:p-1 sm:child:p-1">
          <div className="w-full sm:w-[calc(40%-4px)] md:w-[calc(30%-8px)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-x-2">
                <IconCart classes="h-8 w-8 fill-icon"></IconCart>
                <p className=" text-lg font-medium">Продукты</p>
              </div>
              <div className="ml-1">
                <RenderProducts update={shouldProductsUpdate}></RenderProducts>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton onClick={() => setIsProductsModalOpen(!isProductsModalOpen)}></ReadMoreButton>
            </div>
          </div>
          <div className="w-full sm:w-[calc(60%-4px)] md:w-[calc(70%-8px)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-x-2">
                <IconNotes classes="h-8 w-8 fill-icon"></IconNotes>
                <p className=" text-lg font-medium">Заметки</p>
              </div>
              <div className="ml-1">
                <RenderNotes update={shouldNotesUpdate} count={4}></RenderNotes>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton onClick={() => setIsNotesModalOpen(!isNotesModalOpen)}></ReadMoreButton>
            </div>
          </div>
        </div>
      </div>

      <Modal
      isOpen={isBirthdaysModalOpen}
      setIsOpen={() => setIsBirthdaysModalOpen(!isBirthdaysModalOpen)}>
        <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default">
          <p className="text-lg font-medium">Днюхи</p>
        </div>
      </Modal>

      <Modal
      isOpen={isTasksModalOpen}
      setIsOpen={() => setIsTasksModalOpen(!isTasksModalOpen)}>
        <TasksModal closeModal={() => setIsTasksModalOpen(!isTasksModalOpen)}></TasksModal>
      </Modal>

      <Modal
      isOpen={isProductsModalOpen}
      setIsOpen={() => setIsProductsModalOpen(!isProductsModalOpen)}>
        <ProductsModal closeModal={() => setIsProductsModalOpen(!isProductsModalOpen)}></ProductsModal>
      </Modal>

      <Modal
      isOpen={isNotesModalOpen}
      setIsOpen={() => setIsNotesModalOpen(!isNotesModalOpen)}>
        <NotesModal closeModal={() => setIsNotesModalOpen(!isNotesModalOpen)}></NotesModal>
      </Modal>
    </div>
  );
}