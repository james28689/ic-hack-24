import "./styles.css";
import { useRef } from "react";
import {
    motion
} from "framer-motion";
import Term from "./terms/term";

interface Page3Props {
    top_search_terms_n: { term: string, count: number }[];
}



function Page3({ top_search_terms_n }: Page3Props) {
    const ref = useRef(null);

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
                    <hr className="mx-48" />
                </motion.div>
                <div className="grid grid-cols-12  grid-rows-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 6 }}>
                        <Term text={top_search_terms_n[0].term} num={top_search_terms_n[0].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.5, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 7 }}>
                        <Term text={top_search_terms_n[1].term} num={top_search_terms_n[1].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 4 }}>
                        <Term text={top_search_terms_n[2].term} num={top_search_terms_n[2].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.6, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 4 }}>
                        <Term text={top_search_terms_n[3].term} num={top_search_terms_n[3].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.2, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 8 }}>
                        <Term text={top_search_terms_n[4].term} num={top_search_terms_n[4].count}></Term>
                    </motion.div>
                    {/* <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.4, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 5 }}>
                        <Term text={top_search_terms_n[5].term} num={top_search_terms_n[5].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.9, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 8 }}>
                        <Term text={top_search_terms_n[6].term} num={top_search_terms_n[6].count}></Term>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.7, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 6 }}>
                        <Term text={top_search_terms_n[7].term} num={top_search_terms_n[7].count}></Term>
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
}

export default Page3