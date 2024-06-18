const fs = require("fs");
/*
write to a file using file system module
fs.writeFile(file, data[, options], callback)
*/
// fs.writeFile("message1.txt", "Hello AK!,Welcome to programming.", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });


/* 
to read a file 
fs.readFile(path[, options], callback)
*/
// fs.readFile(path,encoding specification, callback)
fs.readFile("./message1.txt","utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
