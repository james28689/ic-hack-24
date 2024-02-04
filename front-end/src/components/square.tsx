import { motion } from 'framer-motion';

interface SquareProps {
    color: string;
    initX: number;
    initY: number;
}

export default function Square({ color, initX, initY }: SquareProps) {

    return (
        <div>
            <motion.div
                id={color} // You can use a different identifier
                initial={{ y: 300, opacity: 0 }}
                whileInView={{ x: initX, y: initY, opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className={`w-10 h-10 bg-purple`}
            />
        </div>
    );
}