
import { motion } from "framer-motion";
import "./styles.css";
import { useState } from "react";

interface TermProps {
    text: string;
    num: number;
}

const Term = ({ text, num }: TermProps) => {
    const [isHovered, setHovered] = useState(false);

    return (
        <div className="example-container">
            <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }} >
                <div className="flex flex-col justify-center align-middle">
                    <div className="h-4"></div>
                    <div className="text-xl text-center">
                        {text}
                    </div>
                    <motion.div
                        className="transition-all"
                        style={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div>
                            Searched {num} times
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
};

export default Term;
