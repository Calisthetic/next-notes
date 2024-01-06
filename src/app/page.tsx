import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col flex-grow gap-y-2 max-w-xs">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-primary-foreground">Username</label>
          <input type="text" id="username" name="username" className="mt-1 px-2 py-1 w-full border rounded-md 
          focus:border-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-input transition-colors duration-300"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-foreground">Password</label>
          <input type="password" id="password" name="password" className="mt-1 px-2 py-1 w-full border rounded-md 
          focus:border-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-input transition-colors duration-300"/>
        </div>
        <div>
          <button className="w-full bg-button text-button-foreground px-2 py-1 mt-2 rounded-md hover:bg-button-hover 
          focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 font-medium">Sign Up</button>
        </div>
      </div>
    </div>
  )
}
