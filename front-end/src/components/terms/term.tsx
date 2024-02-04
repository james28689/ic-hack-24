
import { motion } from "framer-motion";
import "./styles.css";
import { useState } from "react";

interface TermProps {
    text: string;
    num: number;
}

const Term = ({ text, num }: TermProps) => {

    const maxLength = 30;
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="example-container rounded-full">
            <motion.div
                className="shadow-blue shadow-md bg-opacity-30"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                whileHover={{ scale: 1.4 }}
                whileInView={{ scale: 1 }} >
                <div className="flex flex-col bg-gradient-to-b from-blue to-white  h-full items-center justify-center align-middle ">
                    <div className=" px-2 transition-all mt-10 text-xl text-center">
                        <p className={`font-semibold ${isHovering ? "text-xs" : "text-md"}`}>
                            {((text.length > maxLength) && (!isHovering)) ? text.substring(0, maxLength - 3) + "..." : text}
                        </p>
                        <p className={`text-xs ${isHovering ? "opacity-100" : "opacity-0"}`}>Searched {num} times</p>
                    </div>
                </div>

            </motion.div >
        </div >
    );
};

export default Term;
