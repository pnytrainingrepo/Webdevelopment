import Link from "next/link";

export default function Header() {
  return (
     <div className="flex flex-row justify-end bg-teal-300">
        <div className="px-2"> <Link href="/">|Home|</Link> </div>
        <div className="px-2"> <Link href="/about">|About|</Link></div>
        <div className="px-2"> <Link href="/blog">|Blog|</Link> </div>  
        <div className="px-2"> <Link href="/contact">|Contact|</Link> </div>
      </div>
    
  );
}