import { useState, useRef } from "react";
import Title from "../components/Title";
import Sample2 from "../components/Sample2";
import Sample3 from "../components/Sample3";
import html2canvas from "html2canvas";


export default function Home() {
    const [link, setLink] = useState('');

    const containerRef = useRef(undefined);

    const captionHandler = () => {
        html2canvas(containerRef.current).then(canvas => {
            try {
                fetch('/api/upload', {
                  method: 'POST',
                  body: JSON.stringify({ data: canvas.toDataURL() }),
                  headers: { 'Content-Type': 'application/json' },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setLink(data.data);
                  });
              } catch (error) {
                console.error(error);
              }
        })
    }

    return (
        <div className="container" >
            <nav>
                <Title />
                {link && <a href={link}>Link</a>}
                <button onClick={captionHandler}>Caption</button>
            </nav>
            <div className="row"  ref={containerRef}>
                <div className="column" >
                    <div className="title"><span>[ KineticTypographyCSS ]</span></div>
                </div>
                <div className="column">
                    <Sample2 />
                </div>
            </div>
        </div>
    )
}
