import { FlagIcon } from 'lucide-react'
import Link from 'next/link'

export default function FallbackUI() {
  return (
    <div className='h-screen mx-auto grid place-items-center text-center px-8'>
      <div className='text-center'>
        <FlagIcon className='w-20 h-20 mx-auto text-blue-500' />
        <h1 className='mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          Something Went Wrong.
        </h1>
        <p className='mt-6 text-lg text-gray-600'>
          {`Please try refreshing the page or come back later.`}
        </p>
        <div className='mt-10 flex items-center justify-center'>
          <Link
            href='/'
            className='
              rounded-md bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow 
              hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-blue-600
            '
          >
            Refresh page
          </Link>
        </div>
      </div>
    </div>
  )
}
