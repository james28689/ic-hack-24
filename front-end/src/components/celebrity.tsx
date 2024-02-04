/* eslint-disable @typescript-eslint/no-unused-vars */
import "./styles.css";
import { useRef } from "react";
import {
    motion
} from "framer-motion";

interface CelebrityProps {
    most_searched_people: { name: string, url: string }[]
}

// eslint-disable-next-line no-empty-pattern
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
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >
                    <img src={most_searched_people[0].url} alt="" />
                    <p>{most_searched_people[0].name}</p>
                </motion.div>
            </div>
        </section>
    );
}

export default Celebrity