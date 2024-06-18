/* 
1. Use the inquirer npm package to get user input.
    but remember to change the type from CJS to module in package.json
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
// var qr = require('qr-image');

inquirer
  .prompt([
    /* Pass your questions in here */
    // 1. Use the inquirer npm package to get user input.
    { message: "Type in your URL:", name: "URL" },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
    const url = answers.URL;
    var qr_img = qr.image(url);
    qr_img.pipe(fs.createWriteStream("qr_img1.png"));

    // 3. Create a txt file to save the user input using the native fs node module.
    fs.writeFile("message.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
