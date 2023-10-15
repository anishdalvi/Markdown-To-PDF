// ensure to add npm install md-to-pdf

const fs = require("fs");
const { mdToPdf } = require("md-to-pdf");

(async () => {
  const pdf = await mdToPdf(
    // { content: "# Hello, World" },
    { path: "markdown.md" },
    { dest: "output.pdf" }
  ).catch(console.error);

  if (pdf) {
    fs.writeFileSync(pdf.filename, pdf.content);
  }
})();
