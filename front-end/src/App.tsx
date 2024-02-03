import {useEffect, useState} from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

function App() {

  const [fingerprint, setFingerprint] = useState("");
  useEffect(() => {
    const setFP = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    setFP();
  });

  return (
    <>
      <h1>Your Browser Wrapped</h1>
      <h3>Browser Fingerprint: {fingerprint}</h3>
    </>
  )
}

export default App
