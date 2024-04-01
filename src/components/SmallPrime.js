import * as React from "react";

// A random prime under 50

let lowPrimes=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

const SmallPrime = () => { return lowPrimes[Math.floor(Math.random()*lowPrimes.length)]; }

export default SmallPrime;
