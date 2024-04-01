import * as React from "react";
import SmallPrime from "./SmallPrime";
import Coprime from "./Coprime";

// Renders a positive comment about the chosen area based on HHGTTG quotes.

export class PositiveComment extends React.Component {

constructor() {
    super();
   
    this.state = {positive:[ "that's just perfectly normal paranoia.",
      "you live and learn. At any rate, you live.",
      "I can even work out your personality problems to ten decimal places if it will help.",
      "... I regret I have been temporarily closed to all communication. Meanwhile, here is some light music.",
      "we apologise for the inconvenience.",
      "ravenous Bugblatter Beasts often make a very good meal for visiting tourists.",
      "... what about the End of the Universe? We’ll miss the big moment.",
      "this fact may safely be made the subject of suspense since it is of no significance whatsoever.",
      "I think the Universe is in pretty good hands, yeah?",
      "we live in strange times. We also live in strange places: each in a universe of our own.",
      "the Guide is definitive. Reality is frequently inaccurate.",
      "where it is inaccurate it is at least definitively inaccurate. In cases of major discrepancy it’s always reality that’s got it wrong",
      "the Census report, like most such surveys, had cost an awful lot of money and told nobody anything they didn’t already know.",
      "... please relax, you are perfectly safe",
      "all you really need to know for the moment is that the universe is a lot more complicated than you might think, even if you start from a position of thinking it’s pretty damn complicated in the first place.",],
         last:0,
         step:1} // Defaults
         
      let step=SmallPrime();
      while (!Coprime(this.state.positive.length,step)) step=SmallPrime();  // Ensure relatively prime so does full cycle
      
      this.state.last=Math.floor(Math.random()*this.state.positive.length); // Random start point
      this.state.step=step; // Random (subject to coprime constraint) step onwards
}
  render() {
    var a=this.state.last+this.state.step;
    this.state.last=a%this.state.positive.length;
    return (
      <div>
        <p>The thing about the <b>{this.props.last} area</b> is that {this.state.positive[this.state.last]}</p>
      </div>
    );
  }
}

export default PositiveComment;