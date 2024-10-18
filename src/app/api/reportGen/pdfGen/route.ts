import docCreator from '../../../../reportTemplates/doccreator';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
const topdf = require("docx2pdf-converter");
export async function POST(req: Request) {
        try{
            const receivedData  = await req.json();
            //Generate the DOCX
            const data = receivedData.dataJson.submission[0].submissions;
            const inputFile = "flha_template.docx"; // This will have to be made variable later on
            const docBuffer = await docCreator(inputFile, data);
            const docPath = path.join(process.cwd(), 'public', 'output','flha.docx');
            fs.writeFileSync(docPath, docBuffer);
            
            //Convert the DOCX to PDF
            const pdfPath = path.join(process.cwd(), 'public', 'output','flha.pdf');
            await topdf(docPath, pdfPath);

            //return the PDF File
            const pdfBuffer = fs.readFileSync(pdfPath);
            const response = new Response(pdfBuffer, {
                status:200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=flha.pdf',
                },
        });
        return response;
    }catch(error){
        console.error('Error generating document:', error);
        return NextResponse.json({ error: 'Error generating document' });
    }
}