import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className=' font-bold text-3xl my-7 text-center '>Profile</h1>
                <form className='flex flex-col gap-4' >

                    <div className="h-32 w-32 self-center">

                        <img src={currentUser.profilephoto} alt="user" className='w-full h-full object-cover rounded-full border-8 border-[gray] shadow-sm' />
                    </div>
                    <div className='my-2'>
                        <TextInput type='text' id='username' defaultValue={currentUser.username} placeholder='username' className='my-2' readOnly />
                        <TextInput type='email' id='email' defaultValue={currentUser.email} placeholder='email' className='my-2' />
                        <TextInput type='password' id='password' placeholder='Password' className='my-2' />
                    </div>

                    <div className='flex flex-row justify-between'>
                        <Button type='submit' gradientDuoTone={'greenToBlue'}>
                            Update
                        </Button>
                        <Button type='submit' gradientDuoTone={'purpleToBlue'}>
                            Delete Account
                        </Button>
                    </div>




                </form>
            </div>
        </>
    )
}
