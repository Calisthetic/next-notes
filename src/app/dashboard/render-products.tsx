'use client'

import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

interface RenderProductsProps {
  update: boolean
}

export default function RenderProducts({update}:RenderProductsProps) {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      fetch("api/products", {
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
        setResponse(null)
        setTimeout(() => {
          setResponse(data.data)
        }, 10);
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [isUpdate, userIdLS, update])

  async function DeleteProduct(productId: string) {
    await fetch("api/products/"+productId, {
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
      //setIsUpdate(isUpdate)
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  async function AddProduct(name: string, id: string) {
    await fetch("api/products", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
      body: JSON.stringify({
        name: name,
        id: id
      })
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
    <div className="my-1">
      {response ? response.map((item, index) => (
        <div key={index} className="flex flex-row items-center md:flex-nowrap gap-x-1 ml-0.5 my-0.5">
          <CheckButton defaultChecked={false} 
          checkOn={() => DeleteProduct(item[0])} checkOff={() => AddProduct(item[2], item[0])}></CheckButton>
          <span className="ml-1">{item[2]}</span>
        </div>
      )) : (
        <>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] mt-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mt-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mt-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mt-2.5"></div>
        </>
      )}
    </div>
  );
}