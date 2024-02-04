import "./styles.css";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring // Add this import
} from "framer-motion";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
// import { useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Scroller() {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 300);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <Page1></Page1>
      <motion.div style={{ y }}>
        <img className=" " src={"./blocks.svg"} />
      </motion.div>
      <Page2></Page2>
      <Page3></Page3>
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
