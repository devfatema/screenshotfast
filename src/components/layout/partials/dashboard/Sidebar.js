"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardSidebar()
{
    const pathname = usePathname()

    return (
        <div className="h-full shrink-0 overflow-hidden">
            <div className="w-[220px] border-r border-r-black-alpha-1 lg:w-[280px] flex h-full flex-col bg-white px-2 py-4 lg:px-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="w-full">
                            <Image src={'/assets/img/logo1.png'} alt="screenshotfast" width={145} height={35} />
                        </Link>
                    </div>
                    <hr className="mx-3 inline-block h-[1px] bg-slate-200" />
                    <nav className="space-y-4">
                        <div>
                            <Link className="group flex w-full outline-none" href="/dashboard">
                                <span className={`w-60 flex-row gap-3 py-[10px] pr-3 group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-background-accent-subdued pl-[10px] flex items-center ${pathname === '/dashboard' ? 'bg-violet-50 rounded-lg text-violet-600 font-medium' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0 transition duration-200 fill-content-accent">
                                        <path fillRule="evenodd" d="M3 5.5C3 4.11929 4.11929 3 5.5 3H8.5C9.88071 3 11 4.11929 11 5.5V8.5C11 9.88071 9.88071 11 8.5 11H5.5C4.11929 11 3 9.88071 3 8.5V5.5Z" clipRule="evenodd"></path>
                                        <path fillRule="evenodd" d="M3 15.5C3 14.1193 4.11929 13 5.5 13H8.5C9.88071 13 11 14.1193 11 15.5V18.5C11 19.8807 9.88071 21 8.5 21H5.5C4.11929 21 3 19.8807 3 18.5V15.5Z" clipRule="evenodd"></path>
                                        <path fillRule="evenodd" d="M13 5.5C13 4.11929 14.1193 3 15.5 3H18.5C19.8807 3 21 4.11929 21 5.5V8.5C21 9.88071 19.8807 11 18.5 11H15.5C14.1193 11 13 9.88071 13 8.5V5.5Z" clipRule="evenodd"></path>
                                        <path fillRule="evenodd" d="M17 13C17.5523 13 18 13.4477 18 14V16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H18V20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20V18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H16V14C16 13.4477 16.4477 13 17 13Z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-left text-sm">Dashboard</span>
                                </span>
                            </Link>
                        </div>
                        <div className="w-full">
                            <button type="button" className="flex w-60 flex-row items-center gap-2 px-3 py-[11px] focus-visible:ring-accent-alpha-5 focus-visible:misc-border-size-focus-ring disabled:opacity-30 rounded-500 outline-none transition duration-200 cursor-default">
                                <span className="subheading-custom-size text-gray-400">Your Content</span>
                            </button>
                            <Link href="/playground" className="group flex w-full outline-none mb-1.5">
                                <span className={`flex w-60 flex-row items-center gap-3 py-[10px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px] ${pathname === '/playground' ? 'bg-violet-50 rounded-lg text-violet-600 font-medium' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0 transition duration-200 fill-content-secondary">
                                        <path d="M12 18.9878C11.8022 18.9878 11.6089 19.0464 11.4444 19.1562C11.28 19.266 11.1518 19.4221 11.0761 19.6047C11.0004 19.7873 10.9806 19.9882 11.0192 20.1821C11.0578 20.3759 11.153 20.554 11.2929 20.6937C11.4327 20.8335 11.6109 20.9286 11.8049 20.9672C11.9989 21.0058 12.2 20.986 12.3827 20.9103C12.5654 20.8347 12.7216 20.7066 12.8315 20.5423C12.9414 20.378 13 20.1848 13 19.9871C13 19.7221 12.8946 19.4679 12.7071 19.2805C12.5196 19.0931 12.2652 18.9878 12 18.9878ZM18 2H6C5.73478 2 5.48043 2.10528 5.29289 2.29268C5.10536 2.48009 5 2.73426 5 2.99928V11.9928C5 12.7879 5.31607 13.5504 5.87868 14.1126C6.44129 14.6749 7.20435 14.9907 8 14.9907H9V17.359C8.49083 17.9359 8.15907 18.6474 8.04453 19.4081C7.92999 20.1688 8.03753 20.9463 8.35425 21.6474C8.67097 22.3486 9.18341 22.9434 9.83009 23.3607C10.4768 23.778 11.2302 24 12 24C12.7698 24 13.5232 23.778 14.1699 23.3607C14.8166 22.9434 15.329 22.3486 15.6458 21.6474C15.9625 20.9463 16.07 20.1688 15.9555 19.4081C15.8409 18.6474 15.5092 17.9359 15 17.359V14.9907H16C16.7956 14.9907 17.5587 14.6749 18.1213 14.1126C18.6839 13.5504 19 12.7879 19 11.9928V2.99928C19 2.73426 18.8946 2.48009 18.7071 2.29268C18.5196 2.10528 18.2652 2 18 2ZM12 21.9857C11.5976 21.9826 11.2055 21.8584 10.8749 21.6291C10.5443 21.3999 10.2906 21.0763 10.1469 20.7007C10.0033 20.3251 9.97635 19.9149 10.0697 19.5237C10.163 19.1326 10.3722 18.7786 10.67 18.5082C10.7736 18.4148 10.8565 18.3007 10.9133 18.1733C10.9701 18.046 10.9997 17.9082 11 17.7687V14.9907H13V17.7687C13.0003 17.9082 13.0299 18.046 13.0867 18.1733C13.1435 18.3007 13.2264 18.4148 13.33 18.5082C13.6278 18.7786 13.837 19.1326 13.9303 19.5237C14.0236 19.9149 13.9967 20.3251 13.8531 20.7007C13.7094 21.0763 13.4557 21.3999 13.1251 21.6291C12.7945 21.8584 12.4024 21.9826 12 21.9857ZM17 11.9928C17 12.2579 16.8946 12.512 16.7071 12.6994C16.5196 12.8868 16.2652 12.9921 16 12.9921H8C7.73478 12.9921 7.48043 12.8868 7.29289 12.6994C7.10536 12.512 7 12.2579 7 11.9928V10.9936H17V11.9928ZM17 8.99499H7V3.99857H17V8.99499Z"></path>
                                    </svg>
                                    <span className=" text-sm text-left">Playground</span>
                                </span>
                            </Link>
                            <Link href="/usage/logs" className="group flex w-full outline-none mb-1.5">
                                <span className={`flex w-60 flex-row items-center gap-3 py-[10px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px] ${pathname === '/usage/logs' ? 'bg-violet-50 rounded-lg text-violet-600 font-medium' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0 transition duration-200 fill-content-secondary">
                                        <path fillRule="evenodd" d="M11.553 1.10557C11.8345 0.964809 12.1659 0.964809 12.4474 1.10557L22.4474 6.10557C22.7862 6.27496 23.0002 6.62123 23.0002 7C23.0002 7.37877 22.7862 7.72504 22.4474 7.89443L12.4474 12.8944C12.1659 13.0352 11.8345 13.0352 11.553 12.8944L1.55301 7.89443C1.21422 7.72504 1.00022 7.37877 1.00022 7C1.00022 6.62123 1.21422 6.27496 1.55301 6.10557L11.553 1.10557ZM4.23629 7L12.0002 10.882L19.7642 7L12.0002 3.11803L4.23629 7ZM1.10579 11.5528C1.35278 11.0588 1.95345 10.8586 2.44743 11.1056L12.0002 15.882L21.553 11.1056C22.047 10.8586 22.6477 11.0588 22.8946 11.5528C23.1416 12.0468 22.9414 12.6474 22.4474 12.8944L12.4474 17.8944C12.1659 18.0352 11.8345 18.0352 11.553 17.8944L1.55301 12.8944C1.05903 12.6474 0.858803 12.0468 1.10579 11.5528ZM1.10579 16.5528C1.35278 16.0588 1.95345 15.8586 2.44743 16.1056L12.0002 20.882L21.553 16.1056C22.047 15.8586 22.6477 16.0588 22.8946 16.5528C23.1416 17.0468 22.9414 17.6474 22.4474 17.8944L12.4474 22.8944C12.1659 23.0352 11.8345 23.0352 11.553 22.8944L1.55301 17.8944C1.05903 17.6474 0.858803 17.0468 1.10579 16.5528Z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-sm text-left">Usage Logs</span>
                                </span>
                            </Link>
                            <Link href="/settings" className="group flex w-full outline-none">
                                <span className={`flex w-60 flex-row items-center gap-3 py-[10px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px] ${pathname === '/settings' ? 'bg-violet-50 rounded-lg text-violet-600 font-medium' : ''}`}>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 transition duration-200 fill-content-secondary"><path d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"></path></svg>
                                    <span className=" text-sm text-left">Settings</span>
                                </span>
                            </Link>
                        </div>
                    </nav>
                </div>
                <nav className="mt-auto">
                    <button className="group flex w-full outline-none">
                        <span className="flex w-60 flex-row items-center font-medium text-slate-500 gap-3 py-[7px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px]">
                            <span className=" text-sm text-left">What's new</span></span>
                    </button>
                    <button className="group flex w-full outline-none">
                        <span className="flex w-60 flex-row items-center font-medium text-slate-500 gap-3 py-[7px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px]">
                            <span className=" text-sm text-left">Support</span></span>
                    </button>
                    <button className="group flex w-full outline-none">
                        <span className="flex w-60 flex-row items-center font-medium text-slate-500 gap-3 py-[7px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px]">
                            <span className=" text-sm text-left">Suggest an idea</span></span>
                    </button>
                    <button className="group flex w-full outline-none">
                        <span className="flex w-60 flex-row items-center font-medium text-slate-500 gap-3 py-[7px] pr-3  group-focus-visible:ring-accent-alpha-5 group-focus-visible:misc-border-size-focus-ring group-disabled:opacity-30 cursor-pointer rounded-500 outline-none transition duration-200 bg-transparent hover:bg-background-subdued-hover active:bg-background-subdued-down group-focus-visible:bg-background-subdued-hover pl-[10px]">
                            <span className=" text-sm text-left">Report a bug</span></span>
                    </button>
                </nav>
            </div>
        </div>
    )
}