'use client'

import CheckButton from "@/src/components/ui/check-btn";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function RenderProducts() {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]|null>(null);
  const [isUpdate, setIsUpdate] = useState(true)
  
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
        if (res.status !== 200) {
          throw new Error('Wrong data')
        }
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
  }, [isUpdate])

  function RemoveProduct(productId: string) {
    fetch("api/products-of-users/remove/"+productId, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "user-id": userIdLS
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Error...')
      }
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
        <div key={index} className="flex flex-row flex-wrap: md:flex-nowrap gap-x-1">
          <CheckButton defaultChecked={false} checkOn={() => RemoveProduct(item[0])}></CheckButton>
          <span>{item[2]}</span>
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