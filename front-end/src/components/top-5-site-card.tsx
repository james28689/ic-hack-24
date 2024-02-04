import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

interface TopSiteCardProps {
    url: string,
    num: number,
    delay: number
}


function TopSiteCard({ url, num, delay }: TopSiteCardProps) {
    return (
        <motion.div
            className=" py-2"
            initial={{ x: '-100%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: delay, duration: 1.7 }}
        >
            <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900">{url}</h5>
            <p className="text-center font-normal text-gray-700 dark:text-gray-400">{num} visits</p>

        </motion.div>
    )
}

export default TopSiteCard