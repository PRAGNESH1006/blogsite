import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
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
            This is a demo project. You can sign up with your email and password
            or with Google.{" "}
          </p>
        </div>
        {/* div for right side */}
        <div className="right flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Enter-Password"
                id="password"
              />
            </div>
            <div className="">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Re-Enter Password"
                id="password"
              />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type="submit">
              SignUp
            </Button>
            <Button gradientDuoTone={"redToYellow"}>
              Continue with Google
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span className="">Have an Account </span>
            <Link to={"/signin"} className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
