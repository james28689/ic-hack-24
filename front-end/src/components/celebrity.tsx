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
                    className="flex items-center justify-center align-middle h-full"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", delay: 1, duration: 1 }}
                >
                    {most_searched_people.length > 0 ? <>
                        <img className=" m-auto max-w-80 max-h-fit " src={most_searched_people[0].url} alt="" />
                        <p>{most_searched_people[0].name}</p>
                    </> : <div className=" text-center ">Looks like you haven't been looking up many celebrities!</div>}
                </motion.div>
            </div>
        </section>
    );
}

export default Celebrity