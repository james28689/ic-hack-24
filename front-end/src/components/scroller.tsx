import "./styles.css";
import {
  motion,
  useScroll,
  useSpring // Add this import
} from "framer-motion";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Result from "../result";

interface ScrollerProps {
  result: Result | null
}

export default function Scroller({ result }: ScrollerProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <Page1></Page1>
      {/* <WelcomePage></WelcomePage> */}
      {result && <Page2 topSites={result.top_5_visited}></Page2>}
      <Page3></Page3>
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
