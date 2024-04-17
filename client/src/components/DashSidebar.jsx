import { Sidebar } from 'flowbite-react'
import { FaPowerOff, FaRegUser, FaComments } from "react-icons/fa";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    return (

        <Sidebar className='w-full md:w-56 ' >
            <Sidebar.Items >
                <Sidebar.ItemGroup className='cursor-pointer'>
                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item active={tab === 'profile'} icon={FaRegUser} className=' my-2' >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=post' >
                        <Sidebar.Item active={tab === 'post'} icon={BsFillFileEarmarkPostFill} className=' my-2'>
                            Post
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=comments' >
                        <Sidebar.Item active={tab === 'comments'} icon={FaComments} className=' my-2'>
                            Comments
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={FaPowerOff} >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}
