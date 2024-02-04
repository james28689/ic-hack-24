import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";
import Term from "./terms/term";
import Result from "../result";

interface Page3Props {
    top_10_search_terms: { term: string, count: number }[];
}


function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}



function Page3({ top_10_search_terms }: Page3Props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section>
            <div className="flex align-middle justify-center" ref={ref}>
                <motion.div
                    initial={{ fontSize: "0px", lineHeight: "0px" }}
                    whileInView={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >
                    <h1 className="bold w-full justify-center align-middle flex">
                        Let's see your most common search terms!
                    </h1>
                </motion.div>
                <Term text="test" num={9}></Term>
                <motion.h2 style={{ y }}>
                    {/* <Spline scene="https://prod.spline.design/5OrQ4hfAKzxWuOI6/scene.splinecode" /> */}
                </motion.h2>
            </div>
        </section>
    );
}

export default Page3