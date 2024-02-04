import { useScroll } from 'react-use-gesture';
import Blocks from './blocks';
import { motion } from "framer-motion"
import { useState } from 'react';
import Scroller from './scroller';

function Holder() {

    const { scrollYProgress } = useScroll<{ scrollYProgress: number }>(() => { });;
    return (
        <div>
            <Scroller></Scroller>
            {/* <div className=' h-64'></div>
            <div className=" z-10  h-1/2 border-2">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <h1 className=" absolute text-4xl bold w-full justify-center align-middle flex">
                        Welcome! To your browser wrapped!
                    </h1>
                </motion.div>
            </div>
            <div className=' z-0'>
                <motion.div
                    // // initial={{ y: yVal, opacity: 0 }}
                    // whileInView={{ y: yVal, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring' }}
                    style={{ y: scrollYProgress * 100 }}
                ><img src="./blocks.svg" alt="" /></motion.div>
            </div> */}
        </div>
    )
}

export default Holder