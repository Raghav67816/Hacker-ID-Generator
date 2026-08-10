import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: IDCard,
})

function IDCard() {

  const [name, setName] = useState("John Doe")
  const [stack, setStack] = useState("Python")
  const [role, setRole] = useState("Full Stack Dev")
  const [number, setNumber] = useState("1234 5678 9012")
  const [title, setTitle] = useState("BUILDER");

  function generateIdNum() {
    let parts = []
    for (let i = 0; i < 3; i++) {
      let chunk = '';
      for (let j = 0; j < 4; j++) {
        chunk += Math.floor(Math.random() * 10).toString();
      }
      parts.push(chunk);
    }

    const finalNum = parts.join(" ");
    setNumber(finalNum);
  }

  useEffect(() => {
    generateIdNum();
  }, [])

  return (
    <>
      <div style={{ backgroundImage: "url('/sunrise.png')" }} className={'w-full h-screen bg-cover bg-center relative flex items-center justify-center font-victor'}>
        <div className={'w-full h-screen bg-stone-500 opacity-40'} />
        <h1 className={'text-4xl font-bold text-hhg-yellow tracking-wide absolute z-20 top-12 style-cursive drop-shadow-md'}>
          Hacker <span className='text-5xl'>का</span> Adhaar
        </h1>

        <div className={'w-[41%] h-[41%] rounded-md absolute z-0'} />

        <div className={'w-[40%] h-[40%] bg-hhg-green rounded-md absolute z-10 shadow-2xl p-0 pt-8 flex flex-col justify-between items-stretch overflow-hidden'}>
          <div
            style={{ backgroundImage: "url('/logo.svg')" }}
            className={'absolute inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none'}
          />

          <div className={'flex justify-start items-start relative z-10 gap-8 px-4'}>
            <img src={'https://placehold.co/128x128'} alt="Profile Avatar" className="rounded-sm shadow-md" />
            <div className={'flex flex-col gap-y-2 text-hhg-yellow text-sm font-medium'}>
              <p className={'text-2xl'}>{name}</p>
              <p>{stack}</p>
              <p>{role}</p>
              <p>{title}</p>
            </div>
          </div>

          <div className={'w-full flex justify-center relative border-t border-hhg-yellow z-10 pt-4'}>
            <p className={'text-hhg-yellow text-xl font-bold tracking-widest'}>{number}</p>
          </div>
          <div className="-mx-8 bg-pink-500 h-6 flex items-center justify-center gap-2">
            <span className={'text-sm text-white'}>Hacker House Goa</span>
            <span className={'text-sm text-white'}>•</span>
            <span className={'text-sm text-white'}>Verified Hacker</span>
          </div>
        </div>

        {/* Buttons Section (Fixed layout positions, layers, and interactive states) */}
        <div className={'absolute bottom-12 z-30 flex items-center gap-x-4'}>
          <button className="px-5 py-2.5 bg-hhg-accent text-white font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            Download ID
          </button>

          <button
            onClick={generateIdNum}
            className="px-5 py-2.5 bg-hhg-yellow text-hhg-green font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            Generate Another ID
          </button>
        </div>
      </div>
    </>
  )
}