import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [loading, setloading] = useState(false)
  const [errMessage, setErrMessage] = useState(null)
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrMessage('Please fill all the fields');
    }
    try {
      // setloading(true);
      // setErrorMessage(null)
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setErrorMessage(data.message);
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
      // setloading(false);
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setErrorMessage(error.message);
      // setloading(false); this.setLoading(false);
    }
  };
  console.log(errorMessage)


  return (

    <>

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
            {
              (errMessage) && (
                <Alert className="text-red-500 font-bold text-xs h-10  my-2  flex items-center justify-center" color="failure">
                  {errMessage}
                </Alert>
              )
            }
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
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-3 items-center justify-center">
              <span className="">Create an account? </span>
              <Link to={"/sign-up"} className="text-blue-500">
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}