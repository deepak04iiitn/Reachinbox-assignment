import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

export default function SignUp() {

    const [formData , setFormData] = useState({});
    const [errorMessage , setErrorMessage] = useState(null);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        //console.log(e.target.value);

        setFormData({...formData , [e.target.id] : e.target.value.trim() });     // spreading the formData bcz when we will be changing the email/password , we want to keep the previous input field information like of username

    }

    const handleSubmit = async(e) => {          // as we want to submit to database and it takes time so we will use async and await
        
        e.preventDefault();

        if(!formData.username || !formData.email || !formData.password)
            {
                return setErrorMessage('Please fill out all fields!');
            }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch('/api/auth/signup' , {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify(formData),
            });
            const data = await res.json();

            if(data.success === false)
                {
                    return setErrorMessage(data.message);
                }
            
            setLoading(false);

            if(res.ok)
                {
                    navigate('/sign-in');
                }

        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }

    }


  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='flex flex-col gap-4 w-[30%]' onSubmit={handleSubmit}>
        <div>
          <Label value='Your username' />
          <TextInput
            type='text'
            placeholder='Username'
            id='username'
            onChange={handleChange}
          />
        </div>

        <div>
          <Label value='Your email' />
          <TextInput
            type='email'
            placeholder='name@company.com'
            id='email'
            onChange={handleChange}
          />
        </div>

        <div>
          <Label value='Your password' />
          <TextInput
            type='password'
            placeholder='********'
            id='password'
            onChange={handleChange}
          />
        </div>

        <Button gradientDuoTone='purpleToPink' type='submit'>
          Sign Up
        </Button>

        <div className='flex gap-2 text-sm mt-2 justify-center'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500'>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
