import { Button, Navbar } from 'flowbite-react'
import React from 'react'
import { FaMoon , FaSun } from 'react-icons/fa';
import { useSelector , useDispatch } from 'react-redux';                   // how we will know that the person is authenticated or not  , we can just get the info from redux-toolkit using this method
import { toggleTheme } from '../redux/theme/themeSlice.js';

export default function Header() {

    const dispatch = useDispatch();  
    const {theme} = useSelector((state) => state.theme) 

  return (
    <Navbar className='border-b-2 shadow-lg'>

        <div className='flex gap-4 mx-auto items-center p-2'>

            <p className='font-bold text-lg'>REACHINBOX</p>

            <Button className='w-12 h-10  sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>

        </div>
    </Navbar>
  )
}
