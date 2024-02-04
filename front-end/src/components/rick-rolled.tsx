import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";
import Spline from '@splinetool/react-spline';
import Title from "./rickrollstuff/title";


function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface RickRolledProps {
    rolledCount: number
}

function RickRolled({ rolledCount }: RickRolledProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);


    return (
        <section>
            <div ref={ref}>
                <Title />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >

                    <h1 className=" h-20 text-4xl bold w-full justify-center align-middle flex">
                        You were rick rolled a total of {rolledCount} time{(rolledCount != 1) && "s"}!
                        {(rolledCount == 0) && "Damn, not even once?"}
                    </h1>
                </motion.div>

                <motion.h2 style={{ y }}>
                    <Spline scene="https://prod.spline.design/5OrQ4hfAKzxWuOI6/scene.splinecode" />
                </motion.h2>
            </div>
        </section>
    )
}

export default RickRolled