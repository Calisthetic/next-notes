import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <img alt="Notes Project Logo" className="w-8 h-8 mr-2" 
          src="logo.png" />
        </div>
        <button className="flex items-center justify-center w-24 h-8 text-sm font-medium text-black transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none">
          Change Theme
        </button>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-500">Welcome to Notes Project</h1>
          <p className="mt-2 text-lg text-red-300">
            A simple and intuitive platform to manage all your notes in one place.
          </p>
        </header>
        <Link
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none"
          href="/dashboard"
        >
          Get Started
        </Link>
      </main>
    </div>
  )
}
