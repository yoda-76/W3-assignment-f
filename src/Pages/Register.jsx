import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {uri} from '../../config'

export default function Register() {
    const [form, setForm] = useState({ username:"", email: "", password: "" });
    const [error, setError]=useState(false)
    

    const handleChange = (e) => {
        // console.log(form)
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form); // Log the form values
    
        try {
            const response = await fetch(`${uri}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"/"
                },
                body: JSON.stringify({
                    name: form.username,
                    email: form.email,
                    password: form.password
                })
            });
    
            if(response.status===200){
            window.location.href = "/login";
                
            }else if(response.status===203){
                setError(true)
            }else{
                throw new Error('Failed to register');
            }
            

    
            // Add your logic for form submission here, such as redirecting the user or updating the UI based on the response
        } catch (error) {
            // console.error(`Status code: ${response.status}`);

            console.log('Error:', error);
            // Handle error, such as displaying an error message to the user
        }
    };
    

    return (
        <div className='bg-gray-800 h-screen flex flex-col justify-center items-center text-white'>
            <div className='bg-sky-600 w-min h-min p-10'>
            <h1 className='text-white text-3xl text-center'>Register</h1>
            <form className='bg-black flex flex-col gap-1 justify-center items-center' onSubmit={handleSubmit}>
                <div className='m-2 flex items-center'>
                    <label className='text-white'>Username:</label>
                    <input
                        type='username'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        className='flex-grow bg-gray-200 text-black px-2 py-1 rounded-md ml-2'
                    />
                </div>
                <div className='m-2 flex items-center'>
                    <label className='text-white'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        className='flex-grow bg-gray-200 text-black px-2 py-1 rounded-md ml-2'
                    />
                </div>
                {error&&<div className='text-red-600'>This email is already in use</div>}
                <div className='flex m-2 justify-between'>
                    <label className='text-white'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        className='bg-gray-200 text-black px-2 py-1 rounded-md'
                    />
                </div>
                <button type="submit" className='w-6/12 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md'>
                    Submit
                </button>
            </form>

        </div>
        <div className='mt-4 flex items-center justify-around gap-3 	'>
            <p className='text-gray-300'>Already have an account?</p>
            <Link to="/login" className='bg-blue-500 hover:bg-blue-600 text-white font-bold  px-4 rounded'>
                Login
            </Link>
        </div>
        </div>
    );
}
