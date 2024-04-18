
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
// import { FaPlusCircle } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const refUrl = useRef() // for refrencing purposes and hides to file input for profile photos


    function handleImageUpdate(e) {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))

        }
    }



    useEffect(() => {
        if (imageFile) {
            uploading()
        }
    }, [imageFile])


    // uploading img using firebase
    const uploading = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, fileName)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null)
                setImageFile(null);
                setImageFileUrl(null);
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageFileUrl(downloadUrl)
                })

            }
        )

    }


    console.log(imageFile)
    console.log(imageFileUrl)
    console.log(imageFileUploadProgress)
    console.log(imageFileUploadError)
    console.log(imageFileUploading)


    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className=' font-bold text-3xl my-7 text-center '>Profile</h1>
                <form className='flex flex-col gap-4 ' >

                    <input type='file' accept='image/*' className='flex justify-center items-center ' onChange={handleImageUpdate} ref={refUrl} style={{ display: 'none' }} />


                    <div className="h-32 w-32 self-center flex relative " onClick={() => { refUrl.current.click() }}>
                        {
                            imageFileUploading && <CircularProgressbar value={imageFileUploading || 0} text={`${imageFileUploading}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    },
                                    path: {
                                        stroke: `rgba(62,152,199,${imageFileUploadProgress / 100}`
                                    }
                                }}

                            />}
                        <img src={imageFileUrl || currentUser.profilephoto} alt="user" className={`cursor-pointer w-full h-full  rounded-full border-8 border-[gray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'} `} />
                    </div>
                    {/* <FaPlusCircle className='gap-0' /> */}
                    {imageFileUploadError && (
                        <Alert color="failure"> {imageFileUploadError} </Alert>)}

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
