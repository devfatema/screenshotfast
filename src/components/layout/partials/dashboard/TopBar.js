'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { deleteCookie } from 'cookies-next';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardTopBar()
{

    const router = useRouter();

    const handleSignOut = () => {
        deleteCookie(process.env.NEXT_PUBLIC_APP_NAME);
        router.push('/login');
    }

    return (
        <div className="sticky bg-white z-30 top-0">
            <div className="flex items-center space-x-4 justify-end p-3.5">
                <Button>
                    <Link href='/pro'>
                        Upgrade to Pro
                    </Link>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href='/profile' className=" flex items-center justify-between w-full">
                                    <span className=" flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </Link>

                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/settings'} className="flex items-center justify-between w-full">
                                    <span className=" flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </span>
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <button onClick={handleSignOut} className='p-0 m-0 flex items-center justify-between w-full'>
                                <div className=" flex items-center">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </div>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </button>


                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}