
import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div>
            <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
                <div className="flex-1 justify-center flex flex-col">
                    <h2 className='text-2xl'>
                        Want to learn more about JavaScript?
                    </h2>
                    <p className='text-gray-500 my-2'>
                        Checkout these resources with  JavaScript Projects
                    </p>
                </div>
                <div className="flex-1 justify-center flex flex-col">
                    <a href="https://www.youtube.com/results?search_query=js+projects" target="_blank" >
                        <Button className='w-full' variant='primary'>
                            Know More
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}