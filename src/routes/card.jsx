import { useRef, useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Download, RefreshCcw, Share } from 'lucide-react'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';

export const Route = createFileRoute('/card')({
  component: IDCard,
  validateSearch: (search) => {
    return {
      name: search.name || '',
      skills: search.skills || '',
      role: search.role || '',
      imageSrc: search.imageSrc || null,
      cropX: Number(search.cropX) || 0,
      cropY: Number(search.cropY) || 0,
      cropWidth: Number(search.cropWidth) || 0,
      cropHeight: Number(search.cropHeight) || 0,
    }
  }
})

function IDCard() {

  const navigate = useNavigate();

  const [number, setNumber] = useState("1234 5678 9012")
  const [title, setTitle] = useState("BUILDER");

  const { name, skills, role, imageSrc, cropX, cropY, cropWidth, cropHeight } = Route.useSearch();


  function donwloadID() {
    const node = document.getElementById('id-card');
    if(node == null) return;

    const box = node.getBoundingClientRect();

    toPng(node, {
      cacheBust: true,
      width: box.width,
      height: box.height,
      style: {
        transform: 'none',
        left: '0',
        top: '0',
        position: 'static',
        margin: '0'
      }
    }).then((dataUrl) => {
      download(dataUrl, `${name}-hhg-card.png`)
    }).catch((error) => {
      console.log("failed to download image.")
    })
  }


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

        <div id={'id-card'} className={'w-[40%] h-[40%] bg-hhg-green rounded-md absolute z-10 shadow-2xl p-0 pt-8 flex flex-col justify-between items-stretch overflow-hidden'}>
          <div style={{ backgroundImage: "url('/stamp.png')" }}
            className={'absolute inset-0 bg-auto bg-center opacity-2 z-0 pointer-events-none'}
          />

          <div className={'flex justify-start items-start relative z-10 gap-8 px-4'}>
            <div className={'w-32 h-32 relative overflow-hidden bg-neutral-800 rounded-sm shadow-md flex-shrink-0'}>
              <img src={imageSrc}
                alt="Profile Avatar"
                className="w-full h-full rounded-sm shadow-md absolute inset-0 object-cover"
              />
            </div>
            <div className={'flex flex-col gap-y-2 text-hhg-yellow text-sm font-medium'}>
              <p className={'text-2xl'}>{name}</p>
              <p>{skills}</p>
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
          <button className="px-5 py-2.5 flex gap-x-2 bg-hhg-accent text-white font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer" onClick={donwloadID}>
            <Download />
            <span>Download ID</span>
          </button>

          <button
            onClick={() => {
              navigate({to: '/'})
            }}
            className="px-5 py-2.5 flex gap-x-2 bg-hhg-yellow text-hhg-green font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <RefreshCcw />
            Generate Another ID
          </button>

          <button className="px-5 py-2.5 flex gap-x-2 bg-hhg-surface text-black font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            <Share />
            <span>Share On X</span>
          </button>
        </div>
      </div>
    </>
  )
}
