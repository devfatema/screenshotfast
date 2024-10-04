"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Playground()
{

    const [url, setUrl] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const handleUrlChange = (e) => {
        let value = e.target.value;
        // Remove 'https://' if present at the beginning of the input
        value = value.replace(/^https?:\/\//, '');
        setUrl(value);
    }


    return (
        <>
            <div className="px-6">
                <fieldset className="border border-gray-200 rounded-md p-4">
                    <legend className="text-base font-medium px-2">Playground</legend>
                    <div className="flex flex-col gap-4">
                        <div className="w-1/2">
                        
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="prompt" className="text-sm font-medium">Website URL</label>
                                    <div className=" relative h-[45px] mt-[3px]">
                                        <Input onChange={handleUrlChange} value={url} placeholder="Enter your website URL" className="pl-[90px] h-full placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm text-sm font-medium text-black" />
                                        <p className=" absolute left-[7px] top-1/2 y-middle border border-custom-color rounded-sm px-[14px] text-sm py-[6px] text-[#060606]">https://</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <fieldset className="border border-gray-200 rounded-md p-4 mt-4">
                                    <legend className="text-base font-medium px-2">Viewport</legend>
                                    <div className=" flex items-center justify-between space-x-5">
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
                                    </div>
                                </fieldset>
                                
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">

                    </div>
                </fieldset>
               
                
            </div>
        </>
    )
}