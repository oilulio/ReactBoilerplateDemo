import * as React from "react";
import SmallPrime from "./SmallPrime";
import Coprime from "./Coprime";

// Renders a negative comment about the chosen area based on HHGTTG quotes.

export class NegativeComment extends React.Component {

constructor() {
    super();
   
    this.state = {negative:[ 
      "its funny how just when you think life can't possibly get any worse it suddenly does.",
      "nothing travels faster than the speed of light with the possible exception of bad news, which obeys its own special laws.",
      "... would it save you a lot of time if I just gave up and went mad now?",
      "... so this is it ... we are going to die.",
      "... has the world always been like this and I've been too wrapped up in myself to notice?",
      "all through my life I've had this strange unaccountable feeling that something was going on in the world, something big, even sinister, and no one would tell me what it was.",
      "I always think that the chances of finding out what really is going on are so absurdly remote that the only thing to do is to say hang the sense of it and just keep yourself occupied.",
      "to summarize the summary of the summary: people are a problem.",
      "ravenous Bugblatter Beasts often make a very good meal of visiting tourists.",
      "we're not home and dry.  We could not even be said, to be home and vigorously towelling ourselves off.",
      "the idea of a Universe didn’t fit into their world picture, so to speak. They simply couldn’t cope with it. And so, charmingly, delightfully, intelligently, whimsically if you like, they decided to destroy it.",
      "now the world has gone to bed, darkness won't engulf my head, I can see by infrared, how I hate the night.",
      "life’s bad enough as it is without wanting to invent any more of it.",
      "life is wasted on the living.",
      "you’re really not going to like it.",
      "I much prefer it here. So much less reputable, so much more fraught.",
      "the other two-thirds stayed firmly at home and lived full, rich and happy lives until they were all suddenly wiped out by a virulent disease contracted from a dirty telephone.",
      "even traveling despondently is better than arriving here.",
      "one of the extraordinary things about life is the sort of places its prepared to put up with living."],
         last:0,
         step:1} // Defaults
         
      let step=SmallPrime();
      while (!Coprime(this.state.negative.length,step)) step=SmallPrime();  // Ensure relatively prime so does full cycle
      
      this.state.last=Math.floor(Math.random()*this.state.negative.length); // Random start point
      this.state.step=step; // Random (subject to coprime constraint) step onwards
}
  render() {
    var a=this.state.last+this.state.step;
    this.state.last=a%this.state.negative.length;
    return (
      <div>
      <p>The thing about the <b>{this.props.last} area </b>is that {this.state.negative[this.state.last]}</p>
      </div>
    );
  }
}

export default NegativeComment;