import "./styles.css";
import { useRef } from "react";
import Title from "./rickrollstuff/title";
import Strange from "./rickrollstuff/strange-crad";


interface RickRolledProps {
    outliers: string[];
}

function RickRolled({ outliers }: RickRolledProps) {
    const ref = useRef(null);

    return (
        <section>
            <div ref={ref}>
                <Title />
                <div className="flex flex-col items-center justify-start mb-2">
                    <Strange query={outliers[0]} delay={1}></Strange>
                    <Strange query={outliers[1]} delay={1.2}></Strange>
                    <Strange query={outliers[2]} delay={1.4}></Strange>
                    <Strange query={outliers[3]} delay={1.6}></Strange>
                    <Strange query={outliers[4]} delay={1.8}></Strange>
                </div>
            </div>
        </section>
    )
}

export default RickRolled