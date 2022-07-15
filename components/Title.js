import { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Javascript",
  "Kinetic",
  "Text",
  "Animation",
  "Examples"
];

export default function Title() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      500 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='column'>
          <h2>
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </h2>
        </div>
      </div>
    </div>
  )
};