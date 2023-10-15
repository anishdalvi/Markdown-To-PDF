const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');

(async () => {
	//const pdf = await mdToPdf({ path: 'markdown.md' }).catch(console.error);
	const pdf = await mdToPdf({ content: '# Hello, World' }, { dest: 'output.pdf' }).catch(console.error);

	if (pdf) {
		fs.writeFileSync(pdf.filename, pdf.content);
	}
})();