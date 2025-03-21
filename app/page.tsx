import Image from "next/image";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ModeToggle />
      <Image src="/vercel.svg" alt="Vercel Logo" width={283} height={64} />
    </div>
  );
}
