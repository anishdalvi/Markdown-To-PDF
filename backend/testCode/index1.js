// ensure to add npm install markdown-pdf 
var markdownpdf = require("markdown-pdf");

markdownpdf()
    // the markown file should be in same folder
  .from("markdown.md")
  .to("markdown.pdf", function () {
    console.log("Done");
  });