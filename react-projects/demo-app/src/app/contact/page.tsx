'use client'
import Header from "../_components/header";
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  return (
    <>
      <Header />
      <h1 classNameName='text-center text-3xl text-blue-600'>Contact page</h1>
      <br/>
            <div classNameName="text-center">
            <button type="button" onClick={() => router.push('/')}>
              GOTO HOME PAGE
            </button>
            </div>
    </>
  );
}