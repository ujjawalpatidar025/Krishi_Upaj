import React from 'react';
import {Link} from 'react-router-dom'

import Logo from '../Images/Logos/png/logo-color.png'

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-gray-100 text-white">
        <img src={Logo} className='h-full w-full' />
        
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-[#41bb47] shadow-2xl shadow-green-700">
        <h2 className="text-3xl mb-4 text-white font-bold">Sign In</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-700 hover:bg-green-600 text-white font-bold shadow-md shadow-green-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-white hover:underline"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <h2 className='text-sm pt-8 text-gray-200'>Don't have an account ?? <Link to='/signup' className='font-bold text-green-900 hover:underline'>SignUp</Link> </h2>
        
      </div>
    </div>
  );
};

export default LoginPage;
