import React from 'react'
import logo from '../news-anchor.png';

const Header = () => {
  return (
    <header className='bg-neutral-900 text-3xl text-center text-white mb-8 p-5 border-b-4 border-indigo-500'>
    <a class="flex items-center ">
                <img src={logo} class="h-8 mr-3 bg-white rounded-xl border" alt="Flowbite Logo" />
                <span class="self-center text-3xl font-bold whitespace-nowrap dark:text-white">News Reader</span>
                <span className='text-lg font-semibold text-white-500 italic ml-10'> by Voice Command</span>
            </a>
    </header>
  )
}

export default Header
