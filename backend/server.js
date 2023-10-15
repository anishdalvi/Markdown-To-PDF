const express = require("express");
const bodyParser = require("body-parser");
const { mdToPdf } = require("md-to-pdf");
const puppeteer = require("puppeteer"); // Import Puppeteer

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/convert", async (req, res) => {
  const { markdown } = req.body;

  try {
    // Configure Puppeteer with headless: 'new' option
    const browser = await puppeteer.launch({ headless: "new" });

    const pdf = await mdToPdf({ content: markdown, puppeteer: browser }).catch(
      console.error
    );

    await browser.close(); // Close the Puppeteer browser

    if (pdf) {
      pdf.filename = "converted.pdf";
      res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", `attachment; filename="${pdf.filename}"`);
        console.log(pdf);
      res.send(pdf.content);
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
