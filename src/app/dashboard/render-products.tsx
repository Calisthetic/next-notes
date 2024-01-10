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
      fetch("api/products-of-users", {
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
  }, [isUpdate, update])

  async function RemoveProduct(productId: string) {
    await fetch("api/products-of-users/remove/"+productId, {
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

  return (
    <div className="my-1 flex flex-col md:grid md:grid-cols-2 md:gap-x-2 gap-y-0.5">
      {response ? response.map((item, index) => (
        <div key={index} className="flex flex-row items-center md:flex-nowrap gap-x-1 ml-0.5 ">
          <CheckButton defaultChecked={false} checkOn={() => RemoveProduct(item[0])}></CheckButton>
          <span className="ml-1">{item[2]}</span>
        </div>
      )) : (
        <>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[360px] my-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[330px] mb-2.5"></div>
          <div className="h-3 bg-secondary opacity-80 rounded-full animate-pulse max-w-[300px] mb-2.5"></div>
        </>
      )}
    </div>
  );
}