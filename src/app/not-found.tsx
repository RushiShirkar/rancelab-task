import Link from "next/link"

export const metadata = {
  title: "404 - Page Not Found",
}

export default function NotFoundPage() {
  return (
    <main className="grid min-h-[660px] place-items-center bg-white px-6 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-500">404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          {`Sorry, we couldn’t find the page you’re looking for.`}
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            className="
              rounded-md bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow 
              hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-blue-600
            "
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}