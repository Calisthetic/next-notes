"use client"

import { useRef } from "react";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { useRouter } from "next/navigation";


export default function Home() {
  const [userIdLS, setUserIdLS] = useLocalStorage("userId", "");

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigation = useRouter();
  const Navigate = (path: string = "/") => {
    navigation.push(path);
  }


  const authUser = () => {
    if (!loginRef.current || !passwordRef.current) {
      return;
    }

    fetch("api/users/auth", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Wrong data')
      }
      return res.json();
    })
    .then(data => {
      setUserIdLS(data.data)
      navigation.push("/dashboard")
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const autoAuth = () => {
    if (userIdLS) {
      navigation.push("/dashboard")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col flex-grow gap-y-2 max-w-xs">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-primary-foreground">Username</label>
          <input ref={loginRef} type="text" id="username" name="username" className="mt-1 px-2 py-1 w-full border rounded-md bg-input text-input-foreground 
          focus:border-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-input transition-colors duration-300"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-foreground">Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" className="mt-1 px-2 py-1 w-full border rounded-md bg-input text-input-foreground 
          focus:border-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-input transition-colors duration-300"/>
        </div>
        <div>
          <button onClick={authUser} className="w-full bg-button text-button-foreground px-2 py-1 mt-2 rounded-md hover:bg-button-hover 
          focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 font-medium">Sign Up</button>
        </div>
        <div>
          <button onClick={autoAuth} className="w-full bg-button text-button-foreground px-2 py-1 mt-2 rounded-md hover:bg-button-hover 
          focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 font-medium">Are you okey?</button>
        </div>
      </div>
    </div>
  )
}
