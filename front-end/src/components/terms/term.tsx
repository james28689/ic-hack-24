
import { motion } from "framer-motion";
import "./styles.css";

interface TermProps {
    text: string;
    num: number;
}

const Term = ({ text, num }: TermProps) => {

    return (
        <div className="example-container bg-opacity-30">
            <motion.div
                className="shadow-blue shadow-md bg-opacity-30"
                whileHover={{ scale: 1 }}
                whileInView={{ scale: 0.8 }}
                whileTap={{ scale: 0.8 }} >
                <div className="flex flex-col bg-gradient-to-b from-blue to-white  h-full items-center justify-center align-middle ">
                    <div className=" mt-10 text-xl text-center">
                        {text} <br />
                        Searched {num} times
                    </div>
                </div>

            </motion.div >
        </div >
    );
};

export default Term;
