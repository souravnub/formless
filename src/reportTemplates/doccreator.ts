
//Reference Used Docxtemplater Documentation
// Reference Used ChatGPT  Prompt: 
// Show me how to direct download the outputFile based upon this code [code]
const Docxtemplater = require('docxtemplater');
const Pizzip = require('pizzip');
const fs = require('fs');
const path = require('path');
async function docCreator(inputFile:string , data: any){
    //Helper to handle yes/no/na fields
    const toSymbol = (value: string) => {
        if (value === "yes") {
            return "✔";
        } else if (value === "no") {
            return "X";
        } else if (value === "na") {
            return "NA";
        }
        return value;
    };

    const inputPath = path.resolve(process.cwd(), "src", "reportTemplates", "templates", inputFile);
    
    const content = fs.readFileSync(inputPath, 'binary');
    const zip = new Pizzip(content);
    const doc = new Docxtemplater(zip,{
        paragraphLoop:true,
        linebreaks:true
    });
    const itemString = "Inspect and Mark Items Below Satisfactory (Yes), Unsatisfactory (No) or NA as applicable"
    //set the templateVariables
    doc.render({
        project_name: data["Project Name"],
        report_date: "2021-09-01",
        supervisor_name: data["Supervisor Name"],
        task_1: data["Task 1"],
        task_2: data["Task 2"],
        task_3: data["Task 3"],
        task_4: data["Task 4"],
        task_5: data["Task 5"],
        bppe: toSymbol(data[itemString]["Basic PPE (Inspected)"]),
        sppe: toSymbol(data[itemString]["Specific PPE"]),
        hk: toSymbol(data[itemString]["Housekeeping"]),
        ss: toSymbol(data[itemString]["Safety Signage"]),
        lad: toSymbol(data[itemString]["Ladders"]),
        scaf: toSymbol(data[itemString]["Scaffolding"]),
        grd: toSymbol(data[itemString]["Guard Rails"]),
        tls: toSymbol(data[itemString]["Tools"]),
        eqi: toSymbol(data[itemString]["Equipment"]),
        ne: toSymbol(data[itemString]["Noise Exposure > 85dBA"]),
        gct: toSymbol(data[itemString]["Grinding / Cutting"]),
        hzm: toSymbol(data[itemString]["Hazardous Materials"]),
        fp: toSymbol(data[itemString]["Flag Person (Trained)"]),
        hoi: toSymbol(data[itemString]["Hoisting and /or Rigging"]),
        ltg: toSymbol(data[itemString]["Lighting"]),
        fo: toSymbol(data[itemString]["Floor Openings"]),
        fa: toSymbol(data[itemString]["Fall Arrest"]),
        fpr: toSymbol(data[itemString]["Fall Prevention"]),
        ms: toSymbol(data[itemString]["Material Storage"]),
        fe: toSymbol(data[itemString]["Fire Extinguishers"]),
        fak: toSymbol(data[itemString]["First Aid Kit"]),
        u_name: "Billy Bob",
        u_i: "BB",
        fq_1: data["Hazard Identification 1"][0],
        fq_2: data["Hazard Identification 2"][0],
        fq_3: data["Hazard Identification 3"][0],
        fq_4: data["Hazard Identification 4"][0],
        fq_5: data["Hazard Identification 5"][0],
        sv_1: data["Hazard Identification 1"][1],
        sv_2: data["Hazard Identification 2"][1],
        sv_3: data["Hazard Identification 3"][1],
        sv_4: data["Hazard Identification 4"][1],
        sv_5: data["Hazard Identification 5"][1],
        hzi_1: data["Hazard Identification 1"][2],
        hzi_2: data["Hazard Identification 2"][2],
        hzi_3: data["Hazard Identification 3"][2],
        hzi_4: data["Hazard Identification 4"][2],
        hzi_5: data["Hazard Identification 5"][2],
        hzc_1: data["Hazard Control 1"],
        hzc_2: data["Hazard Control 2"],
        hzc_3: data["Hazard Control 3"],
        hzc_4: data["Hazard Control 4"],
        hzc_5: data["Hazard Control 5"],
        comm_1: data["Comments"],
        comm_2: "",
        comm_3: "",
        comm_4: "",
        comm_5: "",
        comm_6: "",
        comm_7: "",
        comm_8: "",
        comm_9: "",
        comm_10: "",
        comm_11: "",
        comm_12: "",
    
    });
    
    const buf = doc.getZip().generate({ 
        type: "nodebuffer" ,
        compression: "DEFLATE",
    });
    return buf;

}
export default docCreator;
