// Backend: server.js
const express = require("express");
const bodyParser = require("body-parser");
const { mdToPdf } = require("md-to-pdf");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/convert", async (req, res) => {
  const { markdown } = req.body;

  try {
      const pdf = await mdToPdf(
        { content: markdown },
        //{ dest: "output2.pdf" }
      ).catch(console.error);

      if (pdf) {
          pdf.filename = "converted.pdf";
          res.set("Content-Type", "application/pdf");
          res.set("content-Disposition", `attachment; filename="${pdf.filename}"`);
          res.send(pdf.content);
          //console.log(pdf);
    } else {
      res.status(500).send("PDF conversion error.");
    }
  } catch (error) {
    console.error("PDF conversion error:", error);
    res.status(500).send("PDF conversion error.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
