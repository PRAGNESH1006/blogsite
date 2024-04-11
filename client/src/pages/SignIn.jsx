import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

export default function SignIn() {
  const [formData, setformData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.password || !formData.email) {
      return setErrorMessage("Please fill out all required fields")
    }
    try {
      setLoading(true)
      setErrorMessage(false)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json()

      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      if (res.ok) {
        return navigate('/')
      }
      setLoading(false)
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }

  }


  return (
    <div className="min-h-screen mt-12">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* div for left */}
        <div className="left flex-1">
          {" "}
          <Link to={"/"} className="  font-semibold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Pragnesh&lsquo;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.{" "}
          </p>
        </div>
        {/* div for right side */}
        <div className="right flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="password" placeholder="********" id="password" onChange={handleChange} />
            </div>
            {/* <div className="">
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Re-Enter Password" id="password2" onChange={handleChange} />
            </div> */}
            <Button gradientDuoTone={"purpleToPink"} type="submit" disabled={loading}>
              {
                loading ? <><Spinner size={'sm'} /> <span className="pl-3">Loading...</span></> : "Sign In"
              }
            </Button>
            <Button gradientDuoTone={"redToYellow"}>
              Continue with Google
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-3 items-center justify-center">
            <span className="">Create an account? </span>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className="text-red-500 font-bold text-xs h-8  mt-5 flex items-center justify-center" color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}