const fs = require('fs');
const PDFDocument = require('pdfkit');


const document = new PDFDocument({
  size: 'B5',
  margin: 50,
});


const fontSizeValue = 20; 

if (!isNaN(fontSizeValue)) {
  document.font('media/Lato-Regular.ttf').fontSize(fontSizeValue).text('Tytuł Dokumentu', { align: 'center' });
} else {
  console.error('Nieprawidłowa wartość dla rozmiaru czcionki');
}

document.font('media/Lato-Regular.ttf')
  .fontSize(16)
  .text('Klasa: [Twoja Klasa]', { align: 'center' })
  .text('Nazwisko i Imię: [Twoje Nazwisko i Imię]', { align: 'center' });


const logoPath = 'media/zse-logo.png';
document.image(logoPath, {
  width: document.page.width * 0.3,
  align: 'left',
});

document.fontSize(14)
  .text('Tekst z odstępem od góry, pogrubiony, podkreślony:', { underline: true, bold: true })
  .list(['Punkt 1', 'Punkt 2', 'Punkt 3']); 

document.text('\nOdnośnik więcej: ', { continued: true })
  .link('https://edu.gplweb.pl/?svc=courses', 'https://edu.gplweb.pl/?svc=courses');

const outputPath = 'output.pdf';
document.pipe(fs.createWriteStream(outputPath));
document.end();

console.log(`Dokument PDF został wygenerowany i zapisany w: ${outputPath}`);
