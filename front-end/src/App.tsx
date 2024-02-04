import {useEffect, useState} from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

interface Result {
  top_5_visited: {website: string, visits: number}[];
  top_10_search_terms: {term: string, count: number}[];
  num_forgot_incognito: number;
}

function App() {
  const [result, setResult] = useState(null as Result | null);
  useEffect(() => {
    const setFP = async () => {
      const fp = await FingerprintJS.load();
      const {visitorId} = await fp.get();
      const res = fetch(`${import.meta.env.VITE_API_URL}/${visitorId}`)
                    .then(res => res.json())
                    .then(data => setResult(data));
    };

    setFP();
  }, []);

  return (
    <>
      <h1>Your Browser Wrapped</h1>
      {result ? 
        <div>
          <h2>Top 5 Most Visited</h2>
          <ul>
            {result.top_5_visited.map((site, i) => <li key={i}>{site.website} - {site.visits}</li>)}
          </ul>
          <h2>Top 10 Search Terms</h2>
          <ul>
            {result.top_10_search_terms.map((term, i) => <li key={i}>{term.term} - {term.count}</li>)}
          </ul>
          <h2>Number of Times Forgot Incognito</h2>
          <p>{result.num_forgot_incognito}</p>
        </div>
      : <> </>}
    </>
  )
}

export default App
