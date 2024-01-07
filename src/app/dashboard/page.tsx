'use client'

import IconBirthday from "@/src/components/icons/icon-birthday";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboars () {
  const [userIdLS, setUserIdLS] = useLocalStorage("user-id", "");
  const [response, setResponse] = useState<string[]>();
  
  useEffect(() => {
    fetch("api/birthdays/next/4", {
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
  })  

  return (
    <div className="flex justify-center w-full px-2 pt-2">
      <div className="flex justify-center flex-col w-full max-w-5xl gap-y-2 md:gap-y-4">
        <div className="flex justify-between w-full flex-col sm:flex-row gap-y-2
        child:outline-1 child:outline child:outline-border child:rounded sm:child:rounded-xl">
          <div className="w-full sm:w-[calc(30%-4px)] md:w-[calc(30%-8px)] p-1">
            <div className="flex items-center justify-start gap-x-2">
              <IconBirthday classes="h-8 w-8 fill-icon"></IconBirthday>
              <p className=" text-lg font-medium">Ближайшие днюхи</p>
            </div>
            <div className="my-1">
              {response ? response.map((item, index) => (
                <div key={index} className="flex flex-row flex-wrap: md:flex-nowrap gap-x-1">
                  <span className="opacity-80 font-semibold">{item[3]}</span>
                  <span>{item[2]}</span>
                </div>
              )) : null}
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <div className="flex items-center capitalize transition-colors duration-300 transform hover:underline 
              text-button hover:text-button-hover w-min px-1">
                <Link href="/birthdays" className="whitespace-nowrap">read more</Link>
                <svg className="w-4 h-4 ml-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[calc(70%-4px)] md:w-[calc(70%-8px)]">Ближайшее задание</div>
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row-reverse gap-y-2
        child:outline-1 child:outline child:outline-border child:rounded sm:child:rounded-lg">
          <div className="w-full sm:w-[calc(30%-4px)] md:w-[calc(30%-8px)]">Продукты</div>
          <div className="w-full sm:w-[calc(70%-4px)] md:w-[calc(70%-8px)]">Заметки</div>
        </div>
      </div>
    </div>
  );
}