import Cropper from 'react-easy-crop';
import { useRef, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import getCroppedImage from "../cropImage.js"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [name, setName] = useState("John Doe")
  const [skills, setSkills] = useState("Python")
  const [role, setRole] = useState("Full Stack Dev")
  const [imageSrc, setImageSrc] = useState("https://placehold.co/128x128");
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1);

  const [croppedPixels, setCroppedPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedPixels(croppedAreaPixels);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return;
    let url = URL.createObjectURL(file);
    setImageSrc(url);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  }

  const handleSubmit = async () => {
    console.log(name);
    if (!name || !skills || !role) {
      alert("Please enter all details / कृपया सभी विवरण दर्ज करें")
    }

    try {
      let finalImage = imageSrc;
      if (croppedPixels) {
        finalImage = await getCroppedImage(imageSrc, croppedPixels);
      }


      navigate({
        to: '/card',
        search: {
          name: name,
          skills: skills,
          role: role,
          imageSrc: finalImage,
          cropX: 0,
          cropY: 0,
          cropWidth: 128,
          cropHeight: 128
        }
      });
    }

    catch(error){
      console.error("failed to crop image", error);
    }
  }

  return (
    <div style={{ backgroundImage: "url('/sunrise.png')" }} className={'w-full h-screen bg-cover bg-center relative flex items-center justify-center font-victor'}>
      <div className={'w-[90%] h-[90%] bg-hhg-surface rounded-md border-2 border-hhg-accent p-6 overflow-y-auto'}>
        <h1 className={'tracking-wide font-bold text-xl'}>Apply For Hacker House Adhaar / हैकर हाउस आधार के लिए आवेदन करें</h1>
        <div className={'w-[90%] border-2 mt-2'} />


        <div className="mt-8 flex flex-col md:flex-row gap-x-12 gap-y-8 min-h-0">


          <div className="flex flex-col gap-y-4 max-w-md w-full">
            <div className={'relative w-full aspect-[4/3] bg-neutral-800 rounded-md overflow-hidden shadow-inner'}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Adjust Image / चित्र समायोजित करें</p>
              <input type="range" min={"1"} max={"3"}
                step={"0.1"}
                id="cropRange"
                className={'w-full accent-hhg-accent cursor-pointer'}
                value={zoom}
                onChange={(e) => {
                  setZoom(Number(e.target.value))
                }}
              />
            </div>
          </div>


          <div className="flex-1 flex flex-col gap-y-6 max-w-xl">

            <div>
              <p className="font-semibold text-base">Upload your photo / अपना फोटो अपलोड करें</p>

              <div className="mt-2 space-y-1 text-gray-700">
                <p className="text-sm">
                  1. Please maintain a pleasant smile / कृपया मुस्कुराते रहें
                </p>
                <p className="text-sm">
                  2. Face must be clearly visible / चेहरा स्पष्ट रूप से दिखाई देना चाहिए
                </p>
              </div>

              <input
                type={"file"}
                ref={fileInputRef}
                accept={'image/*'}
                onChange={(e) => {
                  handleImageUpload(e)
                }}
                className={'hidden'}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-5 py-2.5 bg-hhg-accent text-white font-bold text-sm rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                Select Image
              </button>
            </div>

            <div className="border-t border-gray-200 w-full" />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Name / नाम</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:border-hhg-accent text-sm"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Skills (Max 3) / कौशल (अधिकतम 3)</p>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Enter your skills separated by ,"
                  className="w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:border-hhg-accent text-sm"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Role / भूमिका</p>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  type="text"
                  placeholder="Enter your role i.e Full Stack Dev, UI/UX Designer etc.."
                  className="w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:border-hhg-accent text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit(); 
                  }}
                  className="w-full sm:w-auto px-8 py-2.5 bg-hhg-accent text-white font-bold text-sm rounded shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
