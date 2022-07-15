### Animate a javascript kinetic typography


## Introduction
Kinetic typography is an animation technique that uses animating text to capture attention, set a tone, and entertain. We will use javascript to demonstrate how to implement such a technique.


## Codesandbox

Check the sandbox demo on  [Codesandbox](https://codesandbox.io/s/javascript-kinetics-5ce29e).

<CodeSandbox
title="javascript-kinetics"
id="javascript-kinetics-5ce29e"
/>

You can also get the project GitHub repo using [Github](/).

## Prerequisites

Entry-level javascript and React/Nextjs knowledge.

## Setting Up the Sample Project

In your respective folder, create a new net js app using `npx create-next-app kinetic` in your terminal.
Head to your project root directory `cd kinetic`
 

We will begin by setting up [Cloudinary](https://cloudinary.com/?ap=em) integration in our Nextjs serverside backend. We use it to configure the cloudinary media file upload procedure.

Create your Cloudinary account using this [link](https://cloudinary.com/console) and log into it. You will be given a dashboard containing environmental variable keys which are necessary for the Cloudinary integration in our project.

In your project directory, include Cloudinary in your project dependencies `npm install cloudinary`.
Create a new file named `.env.local` and paste the following code. Fill the blanks with your environment variables from Cloudinary dashboard using the following guide.

```bash

".env.local"

CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET =
```

Restart your project using: `npm run dev`.

In the `pages/api` folder, create a new file named `upload.js`. 
Start by configuring Cloudinary environment keys and libraries.

```js

"pages/api/upload.js"
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Create a handler function to execute the POST request. The function will receive captioned media file, post it to the Cloudinary website and capture the media file's Cloudinary link to send it back as a response.

```js
"pages/api/upload.js"

export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        try {
            let fileStr = req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload_large(
                fileStr,
                {
                    chunk_size: 6000000,
                }
            );
            url = uploadedResponse.url
        } catch (error) {
            res.status(500).json({ error: "Something wrong" });
        }

        res.status(200).json({data: url});
    }
}
```
In our front end,  I will demonstrate two ways of animation; css and javascript. 

The css version is easy and quite lengthy. A sample DOM element for our css animation can look like this

```html

<div className="title"><span>[ KineticTypographyCSS ]</span></div>
```
For the code above we will animate it to appear shaking/vibrating constantly. We use the css keyframe transform feature like the below. Feel free to change code settings to your preference:

```css

.title {
  display: flex;
  /* position: absolute; */
  /* transform: translate(-50%, -50%); */
}
.title > span {
  animation: shake 0.5s infinite;
  font-size: 3rem;
  /* color: black; */
}

@keyframes shake {
  0% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
  10% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  20% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  100% {
    transform: translate(1px, 1px) rotate(0deg);
  }
}
```

Our second example will be a javascript scenario that will scroll a piece of a sentence vertically using `react-text-transition` library. For a more fun experience I will use a class component to create this one:

```js
"components/sample2"

import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";

const randomNumber = () => Math.floor(Math.random() * 9999999999 + 100000);

const texts = ["Nextjs", "Cloudinary", "CSS", "react-text-transition", "Kinetic", "Typography"];



export default class Sample2 extends Component {
  state = {
    number: randomNumber(),
    textIndex: 0,
    textFastIndex: 0,
    paragraphIndex: 0,
    customIndex: 0
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        number: randomNumber(),
        textIndex: this.state.textIndex + 1,
        paragraphIndex: this.state.paragraphIndex + 1
      });
    }, 2000);
    setInterval(() => {
      this.setState({
        textFastIndex: this.state.textFastIndex + 1
      });
    }, 150);
  }

  render() {
    return (
      <div>
        <section>
          <section className="inline">
            Javascript
            <ReactTextTransition  inline>
              {texts[this.state.textFastIndex % texts.length]}
            </ReactTextTransition>
            Kinetic Example.
          </section>
        </section>
      </div>
    )
  }
}
```
Once you have your necessary string data to display you can tweak the animation to any style of your choice. We use indexing to track the order of words being scrolled and set intervals on how many milliseconds a should last. Kind of like the code for the title as well.

In addition, we use `html2canvas` to add a caption feature for Cloudinary in case a user wishes to store a caption of their processed result. Once the response is received, It will be visible to the user through the navigation bar.

```js
"pages/index.js"


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
```

The UI from the Github repo will generate like below:


![final UI](https://res.cloudinary.com/dogjmmett/image/upload/v1657832489/UI_qqxd9k.png "final UI")

Enjoy your coding experience.