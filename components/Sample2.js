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
