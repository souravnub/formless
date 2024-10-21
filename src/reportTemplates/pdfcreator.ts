const topdf = require("docx2pdf-converter");

async function pdfCreator(inputPath:String,outputName:String){
    topdf.convert(inputPath,outputName);
}
export default pdfCreator;