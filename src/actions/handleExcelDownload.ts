//Reference ChatGPT: Show me how to direct download the outputFile based upon this code [code]\
//Reference ChatGPT: Show me how to get and use the blob from my post request JSON \


const handleExcelDownload = async ({submissionId}:{submissionId:number}) =>{
    try{
        const data = await fetch(`/api/reportGen/submission?submissions=${submissionId}`,{
            method: 'GET',
        });
        if(!data.ok){
            throw new Error('Error fetching data');
        }
        console.log(data);
        const dataJson = await data.json();
    
    const generateDoc = await fetch('/api/reportGen/excelGen',{
        method: 'POST',
        body: JSON.stringify({dataJson}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!generateDoc.ok){
        throw new Error('Error generating document');
    }
    const blob = await generateDoc.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FLHA.xlsx';
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}catch(error){
    console.error('Error generating document:', error);
}
};
export default handleExcelDownload;
