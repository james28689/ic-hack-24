import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

interface StrangeProps {
    query: string,
    time: string,
    delay: number
}


function Strange({ query, time, delay }: StrangeProps) {
    return (
        <motion.div
            className=" p-4"
            initial={{ x: '-100%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: delay, duration: 1.7 }}
        >
            <div className="flex justify-start mb-2">
                <p className="mr-4 px-5 text-center font-normal text-gray-700 dark:text-gray-400">@{time}</p>
                <div className="flex items-center">
                    <h5 className=" ml-auto text-center text-xl font-bold tracking-tight text-gray-900">"{query}"</h5>

                </div>
            </div>

        </motion.div>
    )
}

export default Strange