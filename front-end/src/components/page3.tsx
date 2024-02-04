import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Page3() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section>
            <div ref={ref}>
                {/* <img src={`/${id}.jpg`} alt="A London skyscraper" /> */}
                Page3
            </div>
            <motion.h2 style={{ y }}>{`#003`}</motion.h2>
        </section>
    );
}

export default Page3