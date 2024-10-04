"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import crypto from 'crypto-js';


export default function Home() {

  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1440)
  const [height, setHeight] = useState(1024)
  const [format, setFormat] = useState('png')
  const [darkMode, setDarkMode] = useState(false)
  const [blockAds, setBlockAds] = useState(true)
  const [renderModeType, setRenderModeType] = useState('viewport')
  const [status, setStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [screenshots, setScreenshots] = useState([])

  const secret = process.env.NEXT_PUBLIC_SIGNATURE_SECRET;

  const generateSignature = (data, timestamp, nonce) => {
    const payload = JSON.stringify({ ...data, timestamp, nonce });
    // Check if secret is defined before using it
    if (typeof secret === 'undefined' || secret === null) {
      console.error('Secret is undefined. Please check your environment variables.');
      return '';
    }
    return crypto.HmacSHA256(payload, secret).toString(crypto.enc.Hex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(url === '') {
      toast.error('Please enter a valid URL')
      return
    }

    if(width < 100 || width > 1920) {
      toast.error('Width must be between 100 and 1920')
      return
    }

    if(height < 100 || height > 1080) {
      toast.error('Height must be between 100 and 1080')
      return
    } 

    if(format !== 'png' && format !== 'jpeg' && format !== 'webp') {
      toast.error('Invalid format')
      return
    }
  
    // Check if the URL is valid
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setStatus(true)

    const data = {
      url: 'https://' + url,
      width: width,
      height: height,
      format: format,
      darkMode: darkMode,
      blockAds: blockAds,
      renderModeType: renderModeType,
      blockCookies: true,
      selector: '.section-service-mockup'
    }

    const timestamp = Date.now();
    const nonce = crypto.lib.WordArray.random(16).toString(); // Generate a random nonce

    const rawBody = JSON.stringify({ ...data, timestamp, nonce });

    // Generate the X-Signature header
    const signature = generateSignature(data, timestamp, nonce);

    await axios.post('/api/screenshot', { ...data, timestamp, nonce }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature
      }
    })
      .then(res => {

        const base64Image = res.data.image;
        const format = res.data.format;
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: `image/${format}` });
        const objectUrl = URL.createObjectURL(blob);
        setScreenshots([...screenshots, objectUrl]);

        setStatus(false)
       
      }).catch(error => {
        setStatus(false)
        toast.error(error.response.data.error)
      })
  }
  
  const handleUrlChange = (e) => {
    let value = e.target.value;
    // Remove 'https://' if present at the beginning of the input
    value = value.replace(/^https?:\/\//, '');
    setUrl(value);
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/email', {
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        
        // Redirect to the specified URL after successful email submission
        window.location.href = 'https://screenshotfast.lemonsqueezy.com/buy/cb3682ac-2b38-4847-8fa6-3753bedcff93';

      }).catch(error => {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
      })
  }

  const handleDownload = (e, screenshot) => {
    e.preventDefault();
    const linkSource = screenshot;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = 'screenshot.png';
    downloadLink.click();
  }

  const handleDelete = (e, index) => {
    e.preventDefault();
    setScreenshots(screenshots.filter((_, i) => i !== index));
  }

  return (
    <>
      <div>
        {/* header area start */}
        <div>
          <div className=" absolute left-1/2 x-middle top-[18%] z-0">
            <Image src={'/assets/img/bg_shape_3.png'} alt="screenshot api" width={800} height={700} />
          </div>
          <div style={{ backgroundImage: "url('/assets/img/bg_shape_1.png')" }} className="bg-center bg-cover bg-no-repeat h-full relative">
            <div>
              <div className="container mx-auto pt-8">
                <div className="bg-white border custom-border-color custom-box-shadow rounded-2xl px-2.5 py-3 flex items-center justify-between">
                  <Link href={'/'}>
                    <Image src={'/assets/img/logo1.png'} alt="screenshotfast" width={155} height={35} />
                  </Link>
                  <a href='https://screenshotfast.lemonsqueezy.com/buy/cb3682ac-2b38-4847-8fa6-3753bedcff93' target="__blank" className="flex items-center bg-black text-white px-5 py-2 text-base rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" className=" mr-2"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"><path d="M 80.039519,211.06969 64.056987,239.90745" /><path d="m 175.96058,211.06969 15.98254,28.83776" /><circle cx="128" cy="128.007" r="95.915" /><path d="M 35.294352,102.43866 A 47.957299,47.957299 0 0 1 17.212686,53.792007 47.957299,47.957299 0 0 1 53.990946,17.175027 47.957299,47.957299 0 0 1 102.55767,35.470309" /><path d="m 127.99967,32.092482 3.8e-4,-15.985761" /><path d="M 128.00005,80.049788 V 128.00708" /><path d="m 128.00005,128.00708 33.91093,33.91093" /><path d="M 220.70575,102.43866 A 47.957299,47.957299 0 0 0 238.78742,53.792007 47.957299,47.957299 0 0 0 202.00916,17.175027 47.957299,47.957299 0 0 0 153.44244,35.470309" /></g></svg> <span>Join Waitlist</span> 
                  </a>
                </div>
              </div>
            </div>
            <div className="min-w-779px mx-auto text-center mt-32 relative z-10">
              <a href='https://screenshotfast.lemonsqueezy.com/buy/cb3682ac-2b38-4847-8fa6-3753bedcff93' className=" flex items-center bg-white rounded-full justify-center max-w-fit mx-auto space-x-3 border custom-border-color custom-box-shadow px-2 py-1.5">
                <div className="bg-gradient text-white text-[11px] py-1 px-3 rounded-full">
                  <p>✨ Pre-launch Offer</p> 
                </div>
                <div>
                  <p className=" text-[13px]">Limited time offers 15% discount using "<strong>EARLY15</strong>" coupon code</p>
                </div>
                <div><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 50 50" className="mx-auto"><path fill="currentColor" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15" /><path fill="currentColor" d="m24.7 34.7l-1.4-1.4l8.3-8.3l-8.3-8.3l1.4-1.4l9.7 9.7z" /><path fill="currentColor" d="M16 24h17v2H16z" /></svg></div>
              </a>
              <h1 className=" mt-10 text-[64px] font-semibold leading-tight">The Fastest Screenshot API for Developers</h1>
              <p className=" text-[#676666] text-base lead mt-[19px]">Quickly capture and deliver clear screenshots with our super-fast API. ScreenshotFast.com is made for developers, offering easy setup and powerful tools to help you automate.</p>
              <div className=" relative w-[524px] max-w-full mx-auto mt-7">
                <form onSubmit={handleEmailSubmit}>
                  <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full px-[22px] placeholder:text-[13px] placeholder:text-[#E4E4E4]  py-[14px] bg-white h-11 rounded-full" placeholder="Enter Your Email Address" />
                  <button type="submit" className="flex absolute right-1 top-1/2 y-middle items-center bg-black text-white px-5 py-2 text-[14px] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" className=" mr-2"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"><path d="M 80.039519,211.06969 64.056987,239.90745" /><path d="m 175.96058,211.06969 15.98254,28.83776" /><circle cx="128" cy="128.007" r="95.915" /><path d="M 35.294352,102.43866 A 47.957299,47.957299 0 0 1 17.212686,53.792007 47.957299,47.957299 0 0 1 53.990946,17.175027 47.957299,47.957299 0 0 1 102.55767,35.470309" /><path d="m 127.99967,32.092482 3.8e-4,-15.985761" /><path d="M 128.00005,80.049788 V 128.00708" /><path d="m 128.00005,128.00708 33.91093,33.91093" /><path d="M 220.70575,102.43866 A 47.957299,47.957299 0 0 0 238.78742,53.792007 47.957299,47.957299 0 0 0 202.00916,17.175027 47.957299,47.957299 0 0 0 153.44244,35.470309" /></g></svg> <span>Early Access</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className=" mt-11 relative w-[815px] h-[515px] mx-auto bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/assets/img/bg_shape_4.png')" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mx-[71px] py-20">
                <div>
                  <Label className=" text-base text-[#5D5C5C] font-normal">Website URL</Label>
                  <div className=" relative h-[45px] mt-[3px]">
                    <Input onChange={handleUrlChange} value={url} placeholder="Enter your website URL" className="pl-[90px] h-full placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm text-sm font-medium text-black" />
                    <p className=" absolute left-[7px] top-1/2 y-middle border border-custom-color rounded-sm px-[14px] text-sm py-[6px] text-[#060606]">https://</p>
                  </div>
                </div>
                <div className=" flex items-center justify-between space-x-5 mt-5">
                  <div className=" w-full">
                    <Label className=" text-base text-[#5D5C5C] font-normal">Width</Label>
                    <div className=" relative h-[45px] mt-[3px]">
                      <Input 
                        type="number" 
                        onChange={(e) => setWidth(e.target.value)} 
                        value={width} 
                        className="h-full placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm text-sm font-medium text-black hide-number-input-spinners" 
                      />
                      <p className=" absolute right-[7px] top-1/2 y-middle border border-custom-color rounded-sm px-[14px] text-sm py-[6px] text-[#060606]">px</p>
                    </div>
                  </div>
                  <div className=" w-full">
                    <Label className=" text-base text-[#5D5C5C] font-normal">Height</Label>
                    <div className=" relative h-[45px] mt-[3px]">
                      <Input onChange={(e) => setHeight(e.target.value)} value={height} type="number" className="h-full placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm text-sm font-medium text-black hide-number-input-spinners" />
                      <p className=" absolute right-[7px] top-1/2 y-middle border border-custom-color rounded-sm px-[14px] text-sm py-[6px] text-[#060606]">px</p>
                    </div>
                  </div>
                  <div className=" w-full">
                    <Label className=" text-base text-[#5D5C5C] font-normal">Format</Label>
                    <Select onValueChange={(e) => setFormat(e)} defaultValue={format}>
                      <SelectTrigger className=" h-11">
                        <SelectValue placeholder="Select Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="jpeg">JPG</SelectItem>
                          <SelectItem value="webp">Webp</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className=" mt-7 flex items-center space-x-12">
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" onCheckedChange={(e) => setDarkMode(e)} />
                    <Label htmlFor="dark-mode" className="text-base text-[#5D5C5C] font-normal">Dark Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="block-mode" checked={blockAds} onCheckedChange={(e) => setBlockAds(e)} />
                    <Label htmlFor="block-mode" className="text-base text-[#5D5C5C] font-normal">Block Ads</Label>
                  </div>
                </div>
                <div className=" mt-7">
                  <p className="text-base text-[#5D5C5C] font-normal">Render Mode</p>
                  <RadioGroup onValueChange={(e) => setRenderModeType(e)} defaultValue="viewport" className="mt-2 flex items-center space-x-5">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="viewport" id="r1" />
                      <Label htmlFor="r1" className="text-base text-[#5D5C5C] font-normal">Viewport</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fullpage" id="r3" />
                      <Label htmlFor="r3" className="text-base text-[#5D5C5C] font-normal">Full Page</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-7 flex items-center justify-end space-x-5">
                  <button type="button" className=" text-base font-medium text-[#646464]">Reset Options</button>
                  {
                    status ? (
                      <button disabled className=" flex items-center space-x-2 bg-gradient text-white px-[30px] py-[10px] rounded-md font-medium opacity-75"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0" /></svg> <span>Please Wait...</span></button>
                    ): (
                      <button type = "submit" className = " flex items-center space-x-2 bg-gradient text-white px-[30px] py-[10px] rounded-md font-medium"><svg xmlns = "http://www.w3.org/2000/svg" width = "18" height = "18" viewBox = "0 0 24 24"><path fill = "none" stroke = "currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0" /></svg> <span>Render</span></button>
                    )
                  }
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className=" relative">
          <div className=" fixed left-1/2 x-middle bottom-[5%] z-20">
            <div className="flex items-center space-x-5">
              {
                screenshots.map((screenshot, index) => (
                  <Link target="_blank" href={screenshot} key={index} className="relative group">
                    <div className="bg-white p-1 custom-border-color custom-box-shadow rounded-lg rotate-6">
                      <img className="max-h-40 max-w-40 sm:max-h-48 sm:max-w-40 rounded-2xl" src={screenshot} alt="screenshot" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-custom-hover rotate-6 rounded-xl opacity-0 group-hover:opacity-100">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
                        <button onClick={(e) => handleDownload(e, screenshot)} className="bg-white text-gray-800 p-1.5 rounded-full transition duration-300 ease-in-out">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button onClick={(e) => handleDelete(e, index)} className="bg-red-500 text-white p-1.5 rounded-full transition duration-300 ease-in-out">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link> 
                ))
              }
             
            </div>
          </div>
        </div>

        {/* header area end */}
        <div className=" mt-28"></div>


        <footer className="bg-white rounded-lg shadow container mx-auto dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://screenshotfast.com" className="hover:underline">ScreenshotFast</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <Link href='/privacy' className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/terms' className="hover:underline me-4 md:me-6">
                  Terms Of Condition
                </Link>
              </li>
            </ul>
          </div>
        </footer>

      </div>
    </>
  );
}