import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground">Welcome to Notes Project</h1>
          <p className="mt-2 text-lg text-foreground">
            A simple and intuitive platform to manage all your notes in one place.
          </p>
        </header>
        <Link
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none"
          href="/dashboard"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
