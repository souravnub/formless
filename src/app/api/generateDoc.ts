//Reference ChatGPT: Show me how to direct download the outputFile based upon this code [code]
import { NextApiRequest, NextApiResponse } from "next";
import  docCreator from "../../reportTemplates/doccreator"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { inputFile, data } = req.body; // Ensure you send the required data in the request

        try {
            const buffer = await docCreator(inputFile, data);
            
            // Set headers to trigger a download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
            res.status(200).send(buffer);
        } catch (error) {
            console.error('Error generating document:', error);
            res.status(500).json({ error: 'Error generating document' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}