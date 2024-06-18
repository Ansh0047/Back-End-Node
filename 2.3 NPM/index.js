
// //      sillyName package to generate random names

// // CJS
// // var generateName = require("sillyname");


// // instead of using the default module CJS,  we will use EJS
// // and for this we use import keyword 

// // EJS
// import generateName from "sillyname";

// var sillyName = generateName();

// // used string interpolation from using javascript using backticks
// console.log(`My name is ${sillyName}.`);



//       superhero package --> to generate superhero name
// EJS
import generateName from "superheroes";
var str = generateName.random();
console.log(`I am a Superhero, ${str}.`);
