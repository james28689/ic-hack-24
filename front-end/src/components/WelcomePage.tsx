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
function WelcomePage() {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 500);


    return (
        <section>
            <div ref={ref}>
                <motion.div style={{ y }}>
                    <img className=" " src={"./blocks.svg"} />
                </motion.div>
            </div>
        </section>
    )
}

export default WelcomePage