# Example Boilerplate React App exploiting public API
## With whimsical Hitch Hiker's Guide To the Galaxy quotes in response to crime statistics

Offers choice of police force location.  Attempts to make a quantification of risk  by looking at number of stop and searches (but API currently always returns ERR502, even for their example).  Hence instead randomly decides if it is better or worse and randomly cycles through appropriate quotes.

Once a force is selected, allows sub selection of a Neighbourhood and retrieves (but does not show) the boundry.

Retains list of visited forces and allows reselection.

`npm install` then `npm run dev` or `npm run build` will setup.  Then `serve` or `npx serve` will serve on localhost.
