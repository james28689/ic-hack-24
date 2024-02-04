import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Scroller from "./components/scroller";
import Result from "./result";
import Spline from '@splinetool/react-spline';


function App() {
  const [result, setResult] = useState(null as Result | null);
  useEffect(() => {
    const setFP = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      fetch(`${import.meta.env.VITE_API_URL}/${visitorId}`)
        .then(res => res.json())
        .then(data => setResult(data));
    };

    setFP();
  }, []);

  return (
    <div>
      <div className=" fixed z-0 h-screen w-full">
        <Spline scene="https://prod.spline.design/aQ0d0H09YPl468f1/scene.splinecode" />
      </div>
      <div className="z-10">
        <Scroller result={result}></Scroller>
      </div>
    </div>
  )
}

export default App
