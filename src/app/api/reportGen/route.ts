//Reference ChatGPT: Show me how to direct download the outputFile based upon this code [code]\
// Reference ChatGPT: I am getting an error no HTML methods exported how to fix?

import docCreator from "@/reportTemplates/doccreator";
import { NextResponse } from 'next/server';
// Handle the POST request
export async function POST(req: Request) {
    try {
        const receivedData  = await req.json();
        console.log("This one: "+JSON.stringify(receivedData)); // Parse the JSON body
        const data = receivedData.dataJson.submission[0].submissions;
        console.log("Here is the Data: " + JSON.stringify(data));
        
        const inputFile = "flha_template.docx"; // This will have to be made variable later on
        // Generate the document
        const buffer = await docCreator(inputFile, data);

        const response = new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': 'attachment; filename=document.docx',
            },
        });
        return response;
    } catch (error) {
        console.error('Error generating document:', error);
        return NextResponse.json({ error: 'Error generating document' }, { status: 500 });
    }
}