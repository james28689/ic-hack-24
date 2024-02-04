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
    const a = useParallax(scrollYProgress, 200);
    const b = useParallax(scrollYProgress, 400);

    return (
        <section>
            <div className="flex flex-col" ref={ref}>
                <motion.div
                    initial={{ fontSize: "0px", lineHeight: "0px" }}
                    whileInView={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >
                    <h1 className="bold w-full justify-center align-middle flex">
                        Let's see your most common search terms!
                    </h1>
                </motion.div>
                <div className="grid grid-cols-12  grid-rows-12 border-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 6 }}>
                        <Term text={top_10_search_terms[0].term} num={top_10_search_terms[0].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.5, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 7 }}>
                        <Term text={top_10_search_terms[1].term} num={top_10_search_terms[1].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 4 }}>
                        <Term text={top_10_search_terms[2].term} num={top_10_search_terms[2].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.6, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 4 }}>
                        <Term text={top_10_search_terms[3].term} num={top_10_search_terms[3].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.2, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 8 }}>
                        <Term text={top_10_search_terms[4].term} num={top_10_search_terms[4].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.4, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 5 }}>
                        <Term text={top_10_search_terms[5].term} num={top_10_search_terms[5].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.9, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 8 }}>
                        <Term text={top_10_search_terms[6].term} num={top_10_search_terms[6].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.7, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 6 }}>
                        <Term text={top_10_search_terms[7].term} num={top_10_search_terms[7].count}></Term>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Page3