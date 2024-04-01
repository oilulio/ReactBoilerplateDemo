import * as React from "react";

// The greatest common divisor of two numbers, division method from pseudocode at https://en.wikipedia.org/w/index.php?title=Euclidean_algorithm&oldid=1170724302
// Works with arbitrary integers.

const GCD = (a,b) => { 
  while (b!=0) {
    var tmp=b;
    b=a%b;
    a=tmp;
  }
  return a;
}

export default GCD;
