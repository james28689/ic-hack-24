import "./styles.css";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

interface CelebrityProps {
    most_searched_people: { name: string, url: string }[]
}


// function useParallax(value: MotionValue<number>, distance: number) {
//     return useTransform(value, [0, 1], [-distance, distance]);
// }


function Celebrity({ most_searched_people }: CelebrityProps) {
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
                        Which celebrity has caught your eye? 😍😍
                    </h1>
                    <hr className="mx-48" />
                </motion.div>

            </div>
        </section>
    );
}

export default Celebrity