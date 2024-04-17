import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
// import { FaPlusCircle } from "react-icons/fa";

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);
    const [updateImage, setUpdatedImage] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [imgUploadingState, setImgUploadingState] = useState(null)
    const [imgUploadingError, setImgUploadingError] = useState(null)
    const refUrl = useRef()// for refrencing purposes and hides to file input for profile photos

    console.log(imgUploadingState, imgUploadingError)


    function handleImageUpdate(e) {
        const file = e.target.files[0]
        if (file) {
            setUpdatedImage(file)
            setImgUrl(URL.createObjectURL(file))
            console.log(updateImage)
        }
    }



    useEffect(() => {
        if (updateImage) {
            uploading()
        }
    }, [updateImage])


    // uploading img using firebase
    const uploading = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + updateImage.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, fileName)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImgUploadingState(progress.toFixed(0))
            },
            (error) => {
                setImgUploadingError(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImgUrl(downloadUrl)
                })

            }
        )

    }


    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className=' font-bold text-3xl my-7 text-center '>Profile</h1>
                <form className='flex flex-col gap-4 ' >

                    <input type='file' accept='image/*' className='flex justify-center items-center ' onChange={handleImageUpdate} ref={refUrl} style={{ display: 'none' }} />

                    <div className="h-32 w-32 self-center flex  " onClick={() => { refUrl.current.click() }}>
                        <img src={imgUrl || currentUser.profilephoto} alt="user" className=' cursor-pointer w-full h-full  rounded-full border-8 border-[gray] ' />
                    </div>
                    {/* <FaPlusCircle className='gap-0' /> */}
                    <div className='my-2'>
                        <TextInput type='text' id='username' defaultValue={currentUser.username} placeholder='username' className='my-2 ' readOnly />
                        <TextInput type='email' id='email' defaultValue={currentUser.email} placeholder='email' className='my-2' />
                        <TextInput type='password' id='password' placeholder='Update Password' className='my-2' />
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
