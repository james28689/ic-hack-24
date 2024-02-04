import { motion } from "framer-motion"

interface AppearingThingyProps {
    text: string
}

function AppearingThingy({ text }: AppearingThingyProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            {text}
        </motion.div>
    )
}

export default AppearingThingy