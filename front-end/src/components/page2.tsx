import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";
import TopSiteCard from "./top-5-site-card";


function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface Page2Props {
    top_visited_n: { website: string, visits: number }[];
}

function Page2({ top_visited_n }: Page2Props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);


    return (
        <section>
            <div ref={ref}>
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >
                    <h1 className=" h-20 text-4xl bold w-full justify-center align-middle flex">
                        Your most common search categories...
                    </h1>
                </motion.div>
                <motion.h2 style={{ y }}>

                </motion.h2>
                <div className="flex flex-col justify-center align-middle items-center">
                    {top_visited_n && top_visited_n.length > 0 && (
                        <>
                            <TopSiteCard url={top_visited_n[0].website} num={top_visited_n[0].visits} delay={2.1} />
                            <TopSiteCard url={top_visited_n[1].website} num={top_visited_n[1].visits} delay={2.2} />
                            <TopSiteCard url={top_visited_n[2].website} num={top_visited_n[2].visits} delay={2.3} />
                            <TopSiteCard url={top_visited_n[3].website} num={top_visited_n[3].visits} delay={2.4} />
                            <TopSiteCard url={top_visited_n[4].website} num={top_visited_n[4].visits} delay={2.5} />
                        </>
                    )}
                </div>

            </div>
        </section>
    )
}

export default Page2