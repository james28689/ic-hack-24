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

function Page2() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section>
            <div ref={ref}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <h1 className=" h-20 text-4xl bold w-full justify-center align-middle flex">
                        Your most visited websites were...
                    </h1>
                </motion.div>
            </div>
            <motion.h2 style={{ y }}>{`#002`}</motion.h2>
        </section>
    );
}

export default Page2