import React, { useRef } from 'react'
import Spline from '@splinetool/react-spline';

interface IncognitoProps {
    num: number;
}

function Incognito({ num }: IncognitoProps) {
    const ref = useRef(null);

    return (
        <section>
            <div ref={ref} className="flex justify-center items-center">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-0">
                    <h1 className="text-center text-5xl font-bold">
                        Uh-Oh! Looks like <i>you</i> forgot incognito {num} times!
                    </h1>
                    <h2 className="text-center mt-5 font-semibold text-xl">(Oops)</h2>
                </div>
                <Spline className="relative z-10" scene="https://prod.spline.design/l3M81S06S2VI2V5i/scene.splinecode" />
            </div>
        </section>
    )
}

export default Incognito