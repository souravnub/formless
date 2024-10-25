
import excelCreator from "@/reportTemplates/excelcreator";
import { NextResponse } from 'next/server';
// Handle the POST request
export async function POST(req: Request) {
    try {
        const receivedData  = await req.json();
        console.log("This one: "+JSON.stringify(receivedData)); // Parse the JSON body
        const data = receivedData.dataJson.submission[0].submissions;
        console.log("Here is the Data: " + JSON.stringify(data));
        
        
        // Generate the document
        const buffer = await excelCreator(data);

        const response = new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=report.xlsx',
            },
        });
        return response;
    } catch (error) {
        console.error('Error generating excelSheet:', error);
        return NextResponse.json({ error: 'Error generating document' }, { status: 500 });
    }
}