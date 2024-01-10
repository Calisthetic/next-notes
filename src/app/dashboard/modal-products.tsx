'use client'

import IconClose from "@/src/components/icons/icon-close";
import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useRef, useState } from "react";

interface ProductsModalProps {
  closeModal: () => void
}

export default function ProductsModal({closeModal}: ProductsModalProps) {
  const [productsResponse, setProductsResponse] = useState<any[]>()
  const [productsRendered, setProductsRendered] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isUpdate, setIsUpdate] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/products/list", {
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
        setProductsResponse(data.data)
        setProductsRendered(data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate])

  const searchInputRef = useRef<HTMLInputElement>(null);

  async function SearchInputHandle(event: React.ChangeEvent<HTMLInputElement>) {
    setProductsRendered(productsResponse?.filter((item) => item[1].toLowerCase().includes(event.target.value.toLowerCase())))
  }

  async function ManageProduct(productId:string) {
    fetch("api/products-of-users/manage/" + productId, {
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
  
  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen h-screen sm:h-auto 
    relative overflow-y-auto flex flex-col justify-between">
      {productsRendered ? (
        <>
          <div>
            <p className="text-lg font-medium">Продукты</p>
            <div className="flex flex-row items-end relative my-2">
              <input type="text" placeholder="поиск" ref={searchInputRef} onInput={SearchInputHandle}
              className="w-full border rounded-md bg-input text-input-foreground 
              focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/>
              <button className="h-7 w-7 rounded-md absolute left-full -translate-x-[27px] translate-y-[1px]
              stroke-border hover:stroke-primary-foreground hover:opacity-80 flex items-center justify-center"
              onClick={() => {
                searchInputRef.current ? searchInputRef.current.value = "" : null
                setProductsRendered(productsResponse?.filter((item) => item[1].toLowerCase().includes(searchInputRef.current?.value.toLowerCase())))
              }}>
                <IconClose classes="h-4 w-4 transition-colors duration-300"></IconClose>
              </button>
            </div>
            {
              productsRendered.map((item) => (
                <div className="flex items-center flex-row my-0.5">
                  <CheckButton defaultChecked={item[5] === "1"} 
                  checkOn={() => ManageProduct(item[0])} checkOff={() => ManageProduct(item[0])}></CheckButton>
                  <span className="ml-1">{item[1]}</span>
                </div>
              ))
            }
          </div>
          <button className="sm:hidden bg-button text-button-foreground rounded-md py-0.5 mt-2 w-full"
          onClick={closeModal}>Сохранить</button>
        </>
      ) : (
        <p className="text-lg font-medium">Loading...</p>
      )}
    </div>
  );
}
