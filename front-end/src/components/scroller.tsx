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
import RickRolled from "./rick-rolled";
import Celebrity from "./celebrity";
import Incognito from "./incognito";

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
      {result && <Page2 top_visited_n={result.top_visited_n}></Page2>}
      {result && <Page3 typical={result.typical}></Page3>}
      {result && <RickRolled outliers={result.outliers}></RickRolled>}
      {result && <Celebrity most_searched_people={result.most_searched_people} />}
      {result && <Incognito num={result.incognito_search}></Incognito>}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
