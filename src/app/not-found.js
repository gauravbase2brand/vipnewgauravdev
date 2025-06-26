import Link from 'next/link';

export default function Custom404() {
  return (
    <section className="flex flex-col items-center justify-start h-screen bg-white font-serif">
      <div className="container mx-auto px-4 text-center">
        <div className="relative w-full max-w-lg mx-auto">
          <div
            className="h-96 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
            }}
          >
            <h1 className="text-6xl font-bold text-center text-gray-800 pt-10">404</h1>
          </div>
        </div>

        <div className="mt-[10px]">
          <h3 className="text-2xl font-semibold text-gray-700">Looks like you're lost</h3>
          <p className="text-gray-600 mt-2">The page you are looking for is not available!</p>
          <Link href="/">
            <span className="inline-block mt-6 px-6 py-3 text-white  bg-primary  rounded shadow cursor-pointer">
              Go to Home
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
