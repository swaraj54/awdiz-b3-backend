// console.log("Hello World!");

// CORE modules - mostly pre defined / packges install throguh npm
// Core modules are the modules that are already present in node js
//  and we can use them without installing any package.
// http fs event

// http

const http = require("http");

const myserver = http.createServer((req, res) => {
  console.log(req.url, "url");
  if (req.url === "/") {
    res.write("Home Page!");
    res.end();
  } else if (req.url === "/login") {
    res.write("Login Page!");
    res.end();
  } else {
    res.write("Page Not Found!");
    res.end();
  }
});

myserver.listen(8000, () => {
  console.log("Server is running on port 8000");
});
