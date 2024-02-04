import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";
import Title from "./rickrollstuff/title";
import Strange from "./rickrollstuff/strange-crad";


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
                <div className="flex flex-col items-center justify-start mb-2">
                    <Strange query="strange 1" time="12:00 pm" delay={1}></Strange>
                    <Strange query="stranwef    werf    wefge 2" time="12:00 pm" delay={1.2}></Strange>
                    <Strange query="strange 3" time="12:00 pm" delay={1.4}></Strange>
                    <Strange query="nge 4" time="12:00 pm" delay={1.6}></Strange>
                    <Strange query="strange 5" time="12:00 pm" delay={1.8}></Strange>
                </div>
            </div>
        </section>
    )
}

export default RickRolled