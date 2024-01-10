interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: () => void
}


export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const modalId = Math.random().toString(36)

  function backgroundClickHandler(event:React.MouseEvent<HTMLButtonElement>) {
    if (event.target instanceof Element) {
      if (event.target.id === modalId) {
        setIsOpen()
      }
    }
  }

  return isOpen ? (
    <button onClick={backgroundClickHandler} id={modalId}
    className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-center items-center z-40">
      {children}
    </button>
  ) : null
}