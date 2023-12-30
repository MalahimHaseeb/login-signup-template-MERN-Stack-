import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axois from "axios"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axois.post("http://localhost:8000/register", { name, email, password })
            .then(result => {
                console.log(result)
                toast.success(result.data.message)
                navigate('/Login')
            })
            .catch(err => {
                console.log(err.message)
                toast.error("Error in  signup")
            })
    }


    return (
        <div>
            <div class="bg-grey-lighter min-h-screen flex flex-col">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name" />

                        <input
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" />

                        <input
                            type="password"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" />

                        <button
                            type="submit"
                            onClick={handleSubmit}  // Change onSubmit to onClick
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                        >Create Account</button>


                    </div>

                    <div class="text-grey-dark mt-6">
                        Already have an account?
                        <Link to='/Login' class="no-underline border-b border-blue text-blue" >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
