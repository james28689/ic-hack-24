import {
    motion
} from "framer-motion";

interface StrangeProps {
    query: string,
    delay: number
}


function Strange({ query, delay }: StrangeProps) {
    return (
        <motion.div
            className=" p-4"
            initial={{ x: '-100%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: delay, duration: 1.7 }}
        >
            <div className="flex justify-start mb-2 bg-pink bg-opacity-30 px-6 py-2 rounded-md shadow-md shadow-pink">
                <div className="flex items-center">
                    <h5 className=" ml-auto text-center text-xl font-bold tracking-tight text-gray-900">"{query}"</h5>

                </div>
            </div>

        </motion.div>
    )
}

export default Strange