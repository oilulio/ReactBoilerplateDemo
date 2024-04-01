import * as React from "react";
import GCD from "./GCD";

// Integers are coprime when GCD=1

const Coprime = (a,b) => GCD(a,b)==1;

export default Coprime;
