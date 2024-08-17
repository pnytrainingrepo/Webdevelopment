'use client'
import Header from "../_components/header";
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  return (
    <>
      <Header />
      <h1 class='text-center text-3xl text-blue-600'>Blog page</h1>
      <br/>
            <div class="text-center">
            <button type="button" onClick={() => router.push('/')}>
              GOTO HOME PAGE
            </button>
            </div>
    </>
  );
}



