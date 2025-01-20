/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-9xl font-extrabold text-red-500 animate-pulse">404</h1>
      <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-200">
        Oops! Page Not Found.
      </h2>
      <p className="mt-2 text-lg md:text-xl text-gray-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="mt-8 px-7 py-7 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-110">
          Go Back to Home
        </Button>
      </Link>
      <div className="mt-12 text-sm text-gray-500">
        <p>
          If you believe this is an error, please contact the administrator of this website at{" "}
          <Link
            href="mailto:support@hackathon.com"
            className="text-blue-400 hover:underline"
          >
            support@hackathon.com
          </Link>.
        </p>
      </div>
    </div>
  );
}