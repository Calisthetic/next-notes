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
  const [newProductsRendered, setNewProductsRendered] = useState<any[]>()
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [isRequestSending, setIsRequestSending] = useState(false)

  const productsInputRef = useRef<HTMLTextAreaElement>(null);

  function splitMulti(str: string, tokens:string[]){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    return str.split(tempChar);
  }

  async function ProductsInputHandle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewProductsRendered(event.target.value.split(/[;,\n]+/))
  }

  async function AddProducts() {
    if (!productsInputRef.current) {
      return
    }
    setIsRequestSending(true)
    await fetch("api/products", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
      body: JSON.stringify({
        name: productsInputRef.current.value
      })
    })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      setIsRequestSending(false)
      closeModal()
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  
  return (
    <div className="bg-primary p-3 m-2 rounded-lg max-w-xs w-full cursor-default max-h-screen sm:h-auto 
    relative overflow-y-auto flex flex-col justify-center">
      <div className="relative">
        <button className="absolute top-0 left-[calc(100%-20px)] child-hover:stroke-primary-foreground"
        onClick={closeModal}>
          <IconClose classes="w-4 h-4 stroke-border transition hover:opacity-70"></IconClose>
        </button>
        <div>
          <p className="text-lg font-medium">Продукты</p>
          <div className="flex flex-row items-end relative my-2">
            {/* <input type="text" placeholder="поиск" ref={productsInputRef} onInput={ProductsInputHandle}
            className="w-full border rounded-md bg-input text-input-foreground 
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300 px-0.5"/> */}
            <textarea rows={4} placeholder="мандаринчики, бананчики, апельсинчики" onInput={ProductsInputHandle} ref={productsInputRef}
            className="w-full border rounded-md bg-input text-input-foreground mb-1 px-0.5
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-input transition-colors duration-300"/>
          </div>
          {newProductsRendered ? newProductsRendered.map((item, index) => (
            index < newProductsRendered.length - 1 ? (
              <div key={index} className="flex items-center text-start flex-row my-0.5 border-b border-border">
                <span className="ml-1">{item}</span>
              </div>
            ) : (
              <div key={index} className="flex items-center text-start flex-row my-0.5">
                <span className="ml-1">{item}</span>
              </div>
            )
          )) : null}
        </div>
      </div>
      <button className="w-full font-medium rounded-md mt-2
      bg-button text-button-foreground hover:bg-button-hover transition-colors"
      onClick={AddProducts}>
        {isRequestSending ? (
          <div className="animate-spin inline-block mt-1 w-4 h-4 border-[3px] border-current border-t-transparent text-button-foreground rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Sending...</span>
          </div>
        ) : "Сохранить"}
      </button>
    </div>
  );
}
