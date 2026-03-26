"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-5">
          <h1 className="text-4xl font-[1000] text-gray-900 italic uppercase italic tracking-tighter">
            Something went <span className="text-blue-600">Wrong</span>
          </h1>
          <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-widest">Build or Runtime Error Detected</p>
          <button
            onClick={() => reset()}
            className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all"
          >
            Try Again Bhai
          </button>
        </div>
      </body>
    </html>
  );
}