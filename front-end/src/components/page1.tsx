import "./styles.css";
import { useRef } from "react";
import {
    motion
} from "framer-motion";
// import Spline from '@splinetool/react-spline';


function Page1() {
    const ref = useRef(null);

    return (
        <section>

            <div ref={ref}>
                <img style={{ filter: "invert(1)" }} className="w-20 h-20 pl-10" src="./ichack.svg" alt="" />
                <div className=" h-48"></div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <h1 className=" h-20 text-4xl bold w-full justify-center align-middle flex">
                        Welcome to your browser wrapped!
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}

export default Page1