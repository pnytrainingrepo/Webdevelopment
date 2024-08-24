'use client';
import Header from "../_components/header";
import NavBar from "../_components/navbar"
import Profile from "../_components/profile"
import AboutProfile from "../_components/aboutprofile"

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <h1 className='text-center text-3xl text-blue-600'>About page</h1>
      <br/>
            <div className="text-center">
            <button type="button" onClick={() => router.push('/')}>
              GOTO HOME PAGE
            </button>
            </div>
            <div>
              <Profile />
            </div>
            <div>
           <AboutProfile />
            </div>
    </>
  );
}