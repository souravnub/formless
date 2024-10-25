
//Have to change File path system
import docCreator from '../../../../reportTemplates/doccreator';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import {exec} from 'child_process';
const topdf = require("docx2pdf-converter");
export async function POST(req: Request) {
        try{
            const receivedData  = await req.json();
            //Generate the DOCX
            const data = receivedData.dataJson.submission[0].submissions;
            const inputFile = "flha_template.docx"; // This will have to be made variable later on
            const docBuffer = await docCreator(inputFile, data);
            const docPath = path.resolve(process.cwd(), 'src', 'temp', 'output','flha.docx');
            fs.writeFileSync(docPath, docBuffer);
            
            //Convert the DOCX to PDF
            
            const psScriptPath = path.resolve(process.cwd(), 'node_modules', 'docx2pdf-converter', 'convert.ps1');
            if(!fs.existsSync(psScriptPath)){
                throw new Error('PowerShell script not found');
            }
            const pdfName = 'flha.pdf';
            const pdfPath = path.resolve(process.cwd(), 'src', 'temp', 'output', pdfName);
            const pdfCommand = `powershell.exe -ExecutionPolicy Bypass -File "${psScriptPath}" -inputPath "${docPath}" -outputPath "${pdfPath}" -keepActive "false"`;
            await new Promise((resolve, reject) => {
                exec(pdfCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error converting to PDF: ${error.message}`);
                        reject(error);
                    }
                    if (stderr) {
                        console.error(`Error converting to PDF: ${stderr}`);
                        reject(stderr);
                    }
                    console.log(`PDF generated: ${pdfPath}`);
                    resolve(stdout);
                });
            });
            fs.unlinkSync(docPath);
            console.log("DOCX Deleted");
            //return the PDF File
            const pdfBuffer = fs.readFileSync(pdfPath);
            const response = new Response(pdfBuffer, {
                status:200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=flha.pdf',
                },
        });
        if(fs.existsSync(pdfPath)){
            fs.unlinkSync(pdfPath);
            console.log("PDF Deleted");
        }
        return response;

    }catch(error){
        console.error('Error generating document:', error);
        return NextResponse.json({ error: 'Error generating document' });
    } 
}