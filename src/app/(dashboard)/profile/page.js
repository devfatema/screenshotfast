'use client'

import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { getCookie } from "cookies-next"
import Spinner from "@/components/ui/spinner"
import toast from "react-hot-toast"
import { set } from "mongoose"



export default function Profile() {
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const profileData = () => {
        const access_key = getCookie(process.env.NEXT_PUBLIC_APP_NAME)
        axios.get('/api/profile/info', {
            headers: {
                'Authorization': `Bearer ${access_key}`
            }
        })
            .then(res => {
                
                setName(res.data.name)
                setUsername(res.data.username)
                setEmail(res.data.email)
                setAvatarPreview(process.env.NEXT_PUBLIC_AWS_S3_URL + '/' + res.data.avatar)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    useEffect(() => {
        profileData();
    }, [])

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        setStatus(true)

        const access_key = getCookie(process.env.NEXT_PUBLIC_APP_NAME)

        const formdata = new FormData();
        formdata.append('avatar', file);
        formdata.append('name', name);
        formdata.append('username', username);
        formdata.append('email', email);

        await axios.post('/api/edit/profile', formdata, {
            headers: {
                'Authorization': `Bearer ${access_key}`
            }
        })
            .then(res => {
                setStatus(false)
                toast.success(res.data.message)
            })
            .catch(err => {
                setStatus(false)
                toast.error(err.response?.data?.msg)
            })
    }

    const avatarChange = (e) => {
        
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const Initials = (name) => {
        // Extract the first characters of the first and last names
        const initials = name.split(' ').map(word => word[0]).join('');

        return initials;
    };

    const changePassword = async (e) => {
        e.preventDefault();

        setLoading(true)

        if (password !== newPassword)
        {
            setLoading(false)
            toast.error("The Password & Confirm Password didn't match")
            return;
        }

        const formData = new FormData();
        formData.append('current_password', currentPassword);
        formData.append('password', password);

        const access_key = getCookie(process.env.NEXT_PUBLIC_APP_NAME)

        await axios.post('/api/change/password', formData, {
            headers: {
                'Authorization': `Bearer ${access_key}`
            }
        })
        .then(res => {
            setLoading(false)
            toast.success(res.data.message)
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.response?.data?.msg)
        })
    }

    return (
        <>
            <div className="px-6 w-2/5 pb-12">
                <h4 className=" text-2xl font-medium text-slate-600">Personal Information</h4>
                <form onSubmit={handleProfileSubmit}>
                    <div className="mt-5 flex items-center space-x-5">
                        <Avatar className='w-16 h-16'>
                            {
                                avatarPreview && (
                                    <span>
                                        <AvatarImage src={avatarPreview} alt="avatar" />

                                    </span>
                                )
                            }
                            <AvatarFallback>{Initials('Arafat Hossain')}</AvatarFallback>
                        </Avatar>
                        <div className="relative">
                            <Button className='text-sm cursor-pointer'>Upload Photo</Button>
                            <input type="file" onChange={avatarChange} className=" absolute left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="text-sm text-slate-600">Your Name</label>
                        <Input onChange={(e) => setName(e.target.value)} value={name} className="mt-2 placeholder:text-slate-400" placeholder="Enter your name" />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm text-slate-600">Username</label>
                        <Input onChange={(e) => setUsername(e.target.value)} value={username} className="mt-2 placeholder:text-slate-400" placeholder="Enter your username" />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm text-slate-600">Email</label>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} className="mt-2 placeholder:text-slate-400" placeholder="Enter your email" />
                    </div>
                    <div>
                        {
                            status ? (
                                <>
                                    <Button className='mt-5 opacity-50'><Spinner /> Please Wait...</Button>
                                </>
                            ): (
                                <Button className = "mt-5">Save Changes</Button>
                            )
                        }
                    </div>
                </form>
                <h4 className="text-2xl mt-12 font-medium text-slate-600">Change Your Password</h4>
                <form onSubmit={changePassword}>
                    <div className="mt-5">
                        <label className="text-sm text-slate-600">Current Password</label>
                        <Input type="password" className="mt-2 placeholder:text-slate-400" onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter your current password" />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm text-slate-600">New Password</label>
                        <Input type="password" className="mt-2 placeholder:text-slate-400" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm text-slate-600">Confirm New Password</label>
                        <Input type="password" className="mt-2 placeholder:text-slate-400" onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password again" />
                    </div>
                    <div>
                        {
                            loading ? (
                            <>
                                <Button className='mt-5 opacity-50'><Spinner /> Please Wait...</Button>
                            </>
                            ) : (
                                <Button className="mt-5">Change Password</Button>
                            )
                        }
                    </div>
                </form>
                
            </div>
        </>
    )
}