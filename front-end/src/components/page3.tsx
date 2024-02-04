import "./styles.css";
import { useRef } from "react";
import {
    motion
} from "framer-motion";
import Term from "./terms/term";

interface Page3Props {
    typical: { title: string, count: number }[];
}



function Page3({ typical }: Page3Props) {
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
                        Let's see what you searched for!
                    </h1>
                    <hr className="mx-48" />
                </motion.div>
                <div className="grid grid-cols-12  grid-rows-12">
                    {typical.length >= 1 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 6 }}>
                        <Term text={typical[0].title} num={typical[0].count}></Term>
                    </motion.div>}
                    {typical.length >= 2 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.5, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 7 }}>
                        <Term text={typical[1].title} num={typical[1].count}></Term>
                    </motion.div>}
                    {typical.length >= 3 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.3, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 4 }}>
                        <Term text={typical[2].title} num={typical[2].count}></Term>
                    </motion.div>}
                    {typical.length >= 4 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.6, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 4 }}>
                        <Term text={typical[3].title} num={typical[3].count}></Term>
                    </motion.div>}
                    {typical.length >= 5 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.2, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 8 }}>
                        <Term text={typical[4].title} num={typical[4].count}></Term>
                    </motion.div>}
                    {typical.length >= 6 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.4, duration: 1 }}
                        style={{ gridRow: 2, gridColumn: 5 }}>
                        <Term text={typical[5].title} num={typical[5].count}></Term>
                    </motion.div>}
                    {typical.length >= 7 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.9, duration: 1 }}
                        style={{ gridRow: 1, gridColumn: 8 }}>
                        <Term text={typical[6].title} num={typical[6].count}></Term>
                    </motion.div>}
                    {typical.length >= 8 && <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 1.7, duration: 1 }}
                        style={{ gridRow: 3, gridColumn: 6 }}>
                        <Term text={typical[7].title} num={typical[7].count}></Term>
                    </motion.div>}
                </div>
            </div>
        </section>
    );
}

export default Page3