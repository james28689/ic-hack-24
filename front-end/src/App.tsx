import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Holder from "./components/holder";
import Scroller from "./components/scroller";

interface Result {
  top_5_visited: { website: string, visits: number }[];
  top_10_search_terms: { term: string, count: number }[];
  num_forgot_incognito: number;
}

function App() {
  const [result, setResult] = useState(null as Result | null);
  useEffect(() => {
    const setFP = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      const res = fetch(`${import.meta.env.VITE_API_URL}/${visitorId}`)
        .then(res => res.json())
        .then(data => setResult(data));
    };

    setFP();
  }, []);

  return (
    <Scroller></Scroller>
  )
}

export default App
