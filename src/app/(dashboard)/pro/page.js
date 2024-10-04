'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next"

export default function Pro()
{

    const [monthly, setMonthly] = useState([])
    const [yearly, setYearly] = useState([])
    const [type, setType] = useState('yearly')
    const [userId, setUserId] = useState('');

    const plans = type === 'yearly' ? yearly : monthly;

    const loadData = async () => {
        try {
            const res = await axios.get('/api/plans');
            setMonthly(res.data.monthly)
            setYearly(res.data.yearly)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, [])
    
    const profileData = () => {
        const access_key = getCookie(process.env.NEXT_PUBLIC_APP_NAME)
        axios.get('/api/profile/info', {
            headers: {
                'Authorization': `Bearer ${access_key}`
            }
        })
            .then(res => {
                setUserId(res.data.id);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        profileData();
    }, [])

    const startTrial = () => {
        console.log('startTrial');
    }


    return (
        <>
            <div className="mx-4">
                <h2 className=" text-slate-600 text-sm mb-3">Active Plan</h2>
                <Card>
                    <CardHeader>
                        <div className=" flex items-center justify-between">
                            <div>
                                <CardTitle>Free</CardTitle>
                                <CardDescription>For organizing every corner of your work and life</CardDescription>
                                <p className=" text-slate-400 text-xs">$0 / per month</p>
                            </div>
                            <div>
                                <Button variant="destructive" disabled>Cancel This Plan</Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <div className="mt-5">
                    <div className="mb-24">
                        <div className="min-w-max">
                            <div className=" p-4">
                                <div className="pb-5 border-b border-gray-200">
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <button onClick={() => setType('monthly')}>
                                            <p className="text-base">Monthly</p>
                                        </button>
                                        <Switch
                                            onCheckedChange={() => setType(type === 'monthly' ? 'yearly' : 'monthly')}
                                            checked={type === 'yearly'}
                                        />
                                        <button onClick={() => setType('yearly')}> 
                                            <p>Annually</p>
                                        </button>
                                    </div>
                                    <div className="inline-block px-4 py-2 rounded-full bg-slate-50 text-primary text-sm">SAVE 15% with annual billing</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {
                                plans.map((plan, index) => (
                                    <>
                                        <div key={index} className="w-96 lg:w-1/3 p-4 relative">
                                            {
                                                plan.popular && (
                                                    <div className=" absolute right-14 top-1 bg-primary text-white text-xs px-4 py-1 rounded-sm">
                                                        <span className=" uppercase">Popular</span>
                                                    </div>
                                                )
                                            }
                                            <div className={`border ${plan.popular ? 'border-primary' : 'border-gray-200'} bg-white rounded-3xl px-8 pb-8 pt-10 h-full`}>
                                                <h2 className="text-center text-xl text-slate-600 mb-4">{plan.name}</h2>
                                                <div className="flex items-end justify-center gap-3 mb-8">
                                                    <h2 className="text-5xl font-bold font-heading">${plan.price}</h2>
                                                    <p className="text-gray-400 text-lg font-medium pb-2">/ month</p>
                                                </div>
                                                {
                                                    plan.free_trial ? (
                                                        <>
                                                            {
                                                                plan.popular ? (
                                                                    <div className="mb-6 text-center">
                                                                        <Button onClick={startTrial} className="h-14 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold focus:ring transition duration-200" href="#">Start {plan.free_trail_limit}-days free trial</Button>
                                                                        <small className=" text-slate-400">No Credit Card required</small>
                                                                    </div>
                                                                ) : (
                                                                        <div className="mb-8 text-center">
                                                                        <button onClick={startTrial} className="h-14 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold hover:bg-gray-50 focus:ring transition duration-200" href="#">Start {plan.free_trail_limit}-days free trial</button>
                                                                        <small className=" text-slate-400">No Credit Card required</small>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                                plan.popular ? (
                                                                    <Button className="h-12 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold focus:ring transition duration-200 mb-8">
                                                                            <a href={plan.lmsqueezy_url + '?checkout[custom][user_id]=' + userId + '&checkout[custom][plan_id]=' + plan._id}>Subscribe Now</a>    
                                                                    </Button>
                                                                ): (
                                                                    <a className="h-12 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold hover:bg-gray-50 focus:ring transition duration-200 mb-8" href={plan.lmsqueezy_url + '?checkout[custom][user_id]=' + userId + '&checkout[custom][plan_id]=' + plan._id}>Subscribe Now</a>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                                <div className=" bg-slate-50 rounded-3xl p-6 flex flex-col gap-8">
                                                    {
                                                        
                                                        Object.entries(plan.data).map(([key, value]) => (
                                                            <div key={key} className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                                                {
                                                                    value.status ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="fill-white bg-red-500 rounded-full p-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                                                    )
                                                                } <span>{value.name}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                            
                            {/* <div className="w-96 lg:w-1/3 p-4 relative">
                                <div className=" absolute right-14 top-1 bg-primary text-white text-xs px-4 py-1 rounded-sm">
                                    <span className=" uppercase">Popular</span>
                                </div>
                                <div className="border border-primary bg-white rounded-3xl px-8 pb-8 pt-10 h-full">
                                    <h2 className="text-center text-xl text-slate-600 mb-4">Standard</h2>
                                    <div className="flex items-end justify-center gap-3 mb-8">
                                        <h2 className="text-5xl font-bold font-heading">$29</h2>
                                        <p className="text-gray-400 text-lg font-medium pb-2">/ month</p>
                                    </div>
                                    <Button className="h-14 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold focus:ring transition duration-200 mb-8" href="#">Subscribe Now</Button>
                                    <div className=" bg-slate-50 rounded-3xl p-6 flex flex-col gap-8">
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>12 Total Websites</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>512MB Storage Limit</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>Free SSL Certificate</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>Unlimited Traffic</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg className="fill-white bg-red-500 rounded-full p-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                            <span>HTML File Export</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg className="fill-white bg-red-500 rounded-full p-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                            <span>Remove Branding</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-96 lg:w-1/3 p-4" data-path="0.0.2.0.1">
                                <div className="border border-gray-200 bg-white rounded-3xl px-8 pb-8 pt-10 h-full">
                                    <h2 className="text-center text-xl text-slate-600 mb-4">Premium</h2>
                                    <div className="flex items-end justify-center gap-3 mb-8">
                                        <h2 className="text-5xl font-bold font-heading">$39</h2>
                                        <p className="text-gray-400 text-lg font-medium pb-2">/ month</p>
                                    </div>
                                    <a className="h-14 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow-sm text-sm font-semibold hover:bg-gray-50 focus:ring transition duration-200 mb-8" href="#">Subscribe Now</a>
                                    <div className=" bg-slate-50 rounded-3xl p-6 flex flex-col gap-8">
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>12 Total Websites</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>512MB Storage Limit</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>Free SSL Certificate</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66666 16C2.66666 8.63592 8.63589 2.66669 16 2.66669C23.3641 2.66669 29.3333 8.63592 29.3333 16C29.3333 23.3641 23.3641 29.3334 16 29.3334C8.63589 29.3334 2.66666 23.3641 2.66666 16ZM20.9368 13.5193C21.0188 13.41 21.0782 13.2854 21.1114 13.1528C21.1446 13.0202 21.1509 12.8823 21.1301 12.7472C21.1092 12.6121 21.0615 12.4825 20.9899 12.3661C20.9182 12.2497 20.824 12.1488 20.7128 12.0693C20.6016 11.9898 20.4756 11.9333 20.3423 11.9032C20.209 11.8731 20.0709 11.87 19.9364 11.894C19.8018 11.918 19.6734 11.9686 19.5587 12.043C19.444 12.1173 19.3453 12.2138 19.2684 12.3269L14.8431 18.5217L12.6222 16.3009C12.4278 16.1197 12.1706 16.0211 11.9049 16.0258C11.6392 16.0305 11.3857 16.1381 11.1978 16.326C11.0099 16.5139 10.9022 16.7674 10.8975 17.0332C10.8928 17.2989 10.9915 17.556 11.1726 17.7504L14.2496 20.8274C14.3549 20.9326 14.4818 21.0136 14.6215 21.0648C14.7613 21.1161 14.9105 21.1363 15.0588 21.124C15.2072 21.1118 15.351 21.0674 15.4805 20.994C15.61 20.9206 15.7219 20.8199 15.8085 20.6988L20.9368 13.5193Z"></path>
                                            </svg> <span>Unlimited Traffic</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg className="fill-white bg-red-500 rounded-full p-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                            <span>HTML File Export</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                                            <svg className="fill-white bg-red-500 rounded-full p-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                            <span>Remove Branding</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}