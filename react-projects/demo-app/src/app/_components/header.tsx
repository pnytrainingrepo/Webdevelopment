import Link from "next/link";

export default function Header() {
  return (
     <div class="flex flex-row justify-end bg-teal-300">
        <div class="px-2"> <Link href="/">|Home|</Link> </div>
        <div class="px-2"> <Link href="/about">|About|</Link></div>
        <div class="px-2"> <Link href="/blog">|Blog|</Link> </div>  
        <div class="px-2"> <Link href="/contact">|Contact|</Link> </div>
      </div>
    
  );
}