import { motion } from 'framer-motion';

interface BlocksProps {
    image: string;
}

export default function Blocks({ image }: BlocksProps) {

    return (
        <div className=' z-0'>
            <motion.div
                initial={{ y: 300, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring' }}
                className={``}
            ><img src={image} alt="" /></motion.div>
        </div>
    );
}