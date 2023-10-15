const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');

(async () => {
	const pdf = await mdToPdf(
    { path: "./backend/markdown.md" },
    { dest: "output.pdf" }
  ).catch(console.error);
	//const pdf = await mdToPdf({ content: '# Hello, World 3' }, { dest: 'output.pdf' }).catch(console.error);

	if (pdf) {
		fs.writeFileSync(pdf.filename, pdf.content);
	}
})();