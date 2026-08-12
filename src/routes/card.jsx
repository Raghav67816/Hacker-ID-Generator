import { useRef, useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Download, RefreshCcw, Share } from 'lucide-react'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';
import { hackerTitles } from '../titles';

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

  const api_key = import.meta.env.VITE_IMG_API_KEY;

  const navigate = useNavigate();

  const [number, setNumber] = useState("1234 5678 9012")
  const [title, setTitle] = useState("BUILDER");
  const [imageUrl, setImgUrl] = useState("");
  const { name, skills, role, imageSrc, cropX, cropY, cropWidth, cropHeight } = Route.useSearch();

  const uploadURL = 'https://api.imgbb.com/1/upload';

  async function donwloadID() {
    const node = document.getElementById('id-card');
    if (node == null) return;

    const box = node.getBoundingClientRect();

    const imageUrl = await toPng(node, {
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

    let idx = Math.floor(Math.random() * hackerTitles.length)
    setTitle(hackerTitles[idx]);
  }

  async function handleShare(){

    const requestBody = new URLSearchParams();
    requestBody.append('key', api_key);
    requestBody.append('image');

    const data = await fetch(uploadURL, {
      method: 'POST'
    })

    const result = await data.json();
    let url = result.data.display_url;
    console.log(url);
  }

  useEffect(() => {
    generateIdNum();
  }, [])

  return (
    <>
      <div style={{ backgroundImage: "url('/sunrise.png')" }} className={'w-full h-screen bg-cover bg-center relative flex items-center justify-center font-victor overflow-x-auto'}>
        <div className={'w-full h-screen bg-stone-500 opacity-40'} />
        <h1 className={'text-4xl font-bold text-hhg-yellow tracking-wide absolute z-20 top-12 style-cursive drop-shadow-md'}>
          Hacker <span className='text-5xl'>का</span> Adhaar
        </h1>

        <div className={'w-[41%] h-[41%] rounded-md absolute z-0'} />

        <div
          style={{ backgroundImage: "url('/stamp.png')", backgroundRepeat: 'no-repeat', backgroundSize: '30%', backgroundPosition: 'bottom 30px right 150px' }}
          className="w-[450px] h-[250px] p-6 bg-hhg-surface absolute z-10 rounded-md border-2 border-hhg-accent overflow-hidden">
          <div>
            <h1 className={'font-bold'}>Department of Hackers / हैकर्स विभाग</h1>
            <h1 className={'text-sm'}>Hacker House Goa 2026</h1>
          </div>

          <div className={'flex justify-between items-center'}>
            <div>
              <p className={'text-md font-bold'}>{name}</p>
              <p className={'text-sm'}>{skills}</p>
              <p className={'text-sm'}>{role}</p>
              <p className={'text-sm'}>{title}</p>
            </div>
            <div className="w-[128px] h-[128px] overflow-hidden shrink-0">
              <img
                src={imageSrc}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className={'text-center mt-4 font-bold tracking-widest text-lg'}>{number}</p>
        </div>

        {/* Buttons Section (Fixed layout positions, layers, and interactive states) */}
        <div className={'absolute bottom-12 z-30 flex items-center gap-x-4'}>
          <button className="px-5 py-2.5 flex gap-x-2 bg-hhg-accent text-white font-bold rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer" onClick={donwloadID}>
            <Download />
            <span>Download ID</span>
          </button>

          <button
            onClick={() => {
              navigate({ to: '/' })
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
