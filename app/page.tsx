import Image from "next/image";
import Banner from "./components/homepage/Banner";
import Card from "./components/homepage/Card";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      <Banner/>
      <Card/>
      <h2>Ahbab hussain arabi</h2>
    </div>
  );
}
