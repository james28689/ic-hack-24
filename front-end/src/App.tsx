import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Holder from "./components/holder";
import Scroller from "./components/scroller";
import Result from "./result";

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
    <Scroller result={result}></Scroller>
  )
}

export default App
