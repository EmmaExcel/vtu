import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Register = () => {
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [form, setForm] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        
        if(form.password === '' && form.email === '') {
            setError('Email & Password is required');
            return;
        }
        
        if (form.email === '') {
            setError('Email is required');
            return;
        }
        
        // Email validation
        if (!validateEmail(form.email)) {
            setError('Invalid email address');
            return;
        }
        
        if (form.password === '') {
            setError('Password is required');
            return;
        }
        
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if(form.confirmPassword === '') {
            setError('Confirm Password is required');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.log(error);
            setError(error)
        }
    };


    useEffect(()=>{
        setTimeout(() => {
            setError('')
        }, 3000);
    })


    return (
        <div className="bg-white h-screen border flex items-center justify-center ">
            <div className=" flex justify-between gap-10  w-11/12 items-center p-14 lg:justify-between md:justify-center sm:justify-center">
            <div className="border bg-white drop-shadow-md h-auto lg:w-4/12 md:w-4/5 sm:w-4/5 py-8 px-14 rounded-sm border">
            <div className="flex flex-col gap-6 ">
                        <div className="headerContainer">
                            <h1>Email & Password</h1>
                            <p>Create a Vento profile with a few details. Your password must have at least 8 characters including letters and a number.</p>
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <form className="formContainer" onSubmit={handleSubmit}>
                            <div className="">
                                <label>
                                    Email Address
                                    <input required name='email' type="text" placeholder='example@gmail.com' value={form.email} onChange={handleChange} />
                                </label>
                            </div>

                            <div className="">
                                <label>
                                    Password
                                    <div className="flex items-center border border-gray-300 outline-none text-gray-600 px-1 rounded-lg ">
                                        <input required name='password' id='password' className='appearance-none border-none' type={show ? "text" : "password"} placeholder='·········' value={form.password} onChange={handleChange} />
                                        <p className='cursor-pointer scale-125' type="button" onClick={handleClick}>
                                            {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <div className="">
                                <label>
                                    Confirm Password
                                    <div className="flex items-center border border-gray-300 outline-none text-gray-600 px-1 rounded-lg ">
                                        <input required name='confirmPassword' id='confirmpassword' className='appearance-none border-none' type={show ? "text" : "password"} placeholder='·········' value={form.confirmPassword} onChange={handleChange} />
                                        <p className='cursor-pointer scale-125' type="button" onClick={handleClick}>
                                            {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <p className='text-sm text-gray-500 font-light'>Forgot password ?
                                <a className='text-blue-600 font-normal cursor-pointer' href="#"> Reset it</a>
                            </p>

                            <button type='submit'>Sign in</button>
                        </form>

                    </div>
                </div>
                <div className=" sm:hidden md:hidden lg:flex hidden h-[330px] w-2/4 p-10 bg-[url('./src/assets/sideimg.png')] bg-cover rounded-lg drop-shadow-lg border">

                </div>
            </div>
        </div>
    )
}

export default Register
