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
    topSites: { website: string, visits: number }[]
}

function Page2({ topSites }: Page2Props) {
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
                        Your most visited websites were...
                    </h1>
                </motion.div>
                <div className="flex flex-col justify-center align-middle">
                    <TopSiteCard url={topSites[0].website} num={topSites[0].visits} delay={2.1} />
                    <TopSiteCard url={topSites[1].website} num={topSites[1].visits} delay={2.2} />
                    <TopSiteCard url={topSites[2].website} num={topSites[2].visits} delay={2.3} />
                    <TopSiteCard url={topSites[3].website} num={topSites[3].visits} delay={2.4} />
                    <TopSiteCard url={topSites[4].website} num={topSites[4].visits} delay={2.5} />
                </div>
            </div>
        </section>
    )
}

export default Page2