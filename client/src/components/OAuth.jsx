import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { app } from '../firebase.js'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

    const navigate = useNavigate()
    const auth = getAuth(app);

    async function handleGoogleClick() {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ promt: "Select_account" })

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultFromGoogle)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    gPhotoURL: resultFromGoogle.user.photoURL,
                    // uid: resultFromGoogle.user.uid
                })
            })
            const data = await res.json()
            if (res.ok) {
                navigate('/')
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Button gradientDuoTone={"redToYellow"} type='button' outline className='flex items-center justify-center ' onClick={handleGoogleClick} >
            <AiFillGoogleCircle className='h-6 w-6 mx-2' /> <span className='mt-[1px]'>Continue with Google</span>
        </Button>
    )
}
