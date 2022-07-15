import React from 'react';
import { init } from "ityped";
import { useEffect, useRef } from 'react';

export default function Sample3() {
    const textRef = useRef();

    useEffect(() => {
        init(textRef.current, {
          showCursor: false,
          backDelay: 1500,
          backSpeed:60,
          strings: ["Web Developer", "Web Designer", "Content Creator"],
        });
      }, []);
    

    return (
        <h3>
            Freelance <span ref={textRef}></span>
        </h3>
    )
}
