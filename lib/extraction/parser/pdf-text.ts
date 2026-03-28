import pdf from 'pdf-parse';

export async function extractPdfText(pdfBuffer: Buffer) {
  const pdfData = await pdf(pdfBuffer);

  return {
    text: pdfData.text,
    pageCount: pdfData.numpages,
  };
}
