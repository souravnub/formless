const Exceljs = require("exceljs");

async function excelCreator(data) {
    // Helper to handle yes/no/na fields
    const toSymbol = (value) => {
        if (value === "yes") return "✔";
        if (value === "no") return "X";
        if (value === "na") return "NA";
        return value;
    };

    const workbook = new Exceljs.Workbook();
    const itemString = "Inspect and Mark Items Below Satisfactory (Yes), Unsatisfactory (No) or NA as applicable";

    const excelData = {
        project_name: data["Project Name"] || "N/A",
        report_date: data["Report Date"] || "2021-09-01",
        supervisor_name: data["Supervisor Name"] || "N/A",
        tasks: [
            data["Task 1"] || "N/A",
            data["Task 2"] || "N/A",
            data["Task 3"] || "N/A",
            data["Task 4"] || "N/A",
            data["Task 5"] || "N/A"
        ],
        checkListQuestionsKey: {
            bppe: "Basic PPE (Inspected)",
            sppe: "Specific PPE",
            hk: "Housekeeping",
            ss: "Safety Signage",
            lad: "Ladders",
            scaf: "Scaffolding",
            grd: "Guard Rails",
            tls: "Tools",
            eqi: "Equipment",
            ne: "Noise Exposure > 85dBA",
            gct: "Grinding / Cutting",
            hzm: "Hazardous Materials",
            fp: "Flag Person (trained)",
            hoi: "Hoisting and /or rigging",
            ltg: "Lighting",
            fo: "Floor Openings",
            fa: "Fall Arrest",
            fpr: "Fall Prevention",
            ms: "Material Storage",
            fe: "Fire Extinguishers",
            fak: "First Aid Kit"
        },
        checkList: {
            bppe: toSymbol(data[itemString]?.["Basic PPE (Inspected)"] || "NA"),
            sppe: toSymbol(data[itemString]?.["Specific PPE"] || "NA"),
            hk: toSymbol(data[itemString]?.["Housekeeping"] || "NA"),
            ss: toSymbol(data[itemString]?.["Safety Signage"] || "NA"),
            lad: toSymbol(data[itemString]?.["Ladders"] || "NA"),
            scaf: toSymbol(data[itemString]?.["Scaffolding"] || "NA"),
            grd: toSymbol(data[itemString]?.["Guard Rails"] || "NA"),
            tls: toSymbol(data[itemString]?.["Tools"] || "NA"),
            eqi: toSymbol(data[itemString]?.["Equipment"] || "NA"),
            ne: toSymbol(data[itemString]?.["Noise Exposure > 85dBA"] || "NA"),
            gct: toSymbol(data[itemString]?.["Grinding / Cutting"] || "NA"),
            hzm: toSymbol(data[itemString]?.["Hazardous Materials"] || "NA"),
            fp: toSymbol(data[itemString]?.["Flag Person (Trained)"] || "NA"),
            hoi: toSymbol(data[itemString]?.["Hoisting and /or Rigging"] || "NA"),
            ltg: toSymbol(data[itemString]?.["Lighting"] || "NA"),
            fo: toSymbol(data[itemString]?.["Floor Openings"] || "NA"),
            fa: toSymbol(data[itemString]?.["Fall Arrest"] || "NA"),
            fpr: toSymbol(data[itemString]?.["Fall Prevention"] || "NA"),
            ms: toSymbol(data[itemString]?.["Material Storage"] || "NA"),
            fe: toSymbol(data[itemString]?.["Fire Extinguishers"] || "NA"),
            fak: toSymbol(data[itemString]?.["First Aid Kit"] || "NA")
        },
        user: {
            u_name: data["User Name"] || "Unknown",
            u_i: data["User Initials"] || "N/A"
        },
        frequencies: {
            fq_1: data["Hazard Identification 1"]?.[0] || "N/A",
            fq_2: data["Hazard Identification 2"]?.[0] || "N/A",
            fq_3: data["Hazard Identification 3"]?.[0] || "N/A",
            fq_4: data["Hazard Identification 4"]?.[0] || "N/A",
            fq_5: data["Hazard Identification 5"]?.[0] || "N/A"
        },
        severities: {
            sv_1: data["Hazard Identification 1"]?.[1] || "N/A",
            sv_2: data["Hazard Identification 2"]?.[1] || "N/A",
            sv_3: data["Hazard Identification 3"]?.[1] || "N/A",
            sv_4: data["Hazard Identification 4"]?.[1] || "N/A",
            sv_5: data["Hazard Identification 5"]?.[1] || "N/A"
        },
        hazards: {
            hzi_1: data["Hazard Identification 1"]?.[2] || "N/A",
            hzi_2: data["Hazard Identification 2"]?.[2] || "N/A",
            hzi_3: data["Hazard Identification 3"]?.[2] || "N/A",
            hzi_4: data["Hazard Identification 4"]?.[2] || "N/A",
            hzi_5: data["Hazard Identification 5"]?.[2] || "N/A"
        },
        controls: {
            hzc_1: data["Hazard Control 1"] || "N/A",
            hzc_2: data["Hazard Control 2"] || "N/A",
            hzc_3: data["Hazard Control 3"] || "N/A",
            hzc_4: data["Hazard Control 4"] || "N/A",
            hzc_5: data["Hazard Control 5"] || "N/A"
        },
        comments: {
            comm_1: data["Comments"] || "N/A"
        }
    };

    // Initialize workbook and worksheet
    workbook.creator = "Formless-Admin";
    const worksheet = workbook.addWorksheet("FLHA Report");
    worksheet.getColumn("A").width = 30;
    worksheet.getColumn("B").width = 30;

    // Start populating worksheet
    worksheet.addRow(["Field Level Hazard Assessment Report (FLHA)"]);
    worksheet.addRow([""]);
    worksheet.addRow(["Project:", excelData.project_name]);
    worksheet.addRow(["Date", excelData.report_date]);
    worksheet.addRow(["Supervisor", excelData.supervisor_name]);
    worksheet.addRow(["Tasks"]);

    excelData.tasks.forEach((task) => {
        worksheet.addRow([task]);
    });

    worksheet.addRow(["Checklist"]);
    Object.keys(excelData.checkList).forEach((key) => {
        const question = excelData.checkListQuestionsKey[key];
        const answer = excelData.checkList[key];
        worksheet.addRow([question, answer]);
    });

    worksheet.addRow(["User Info"]);
    worksheet.addRow(["Name", excelData.user.u_name]);
    worksheet.addRow(["Initials", excelData.user.u_i]);
    worksheet.addRow(["", "Frequencies", "Severities", "Hazards"]);

    Object.keys(excelData.frequencies).forEach((key, index) => {
        const frequencyValue = excelData.frequencies[key];
        const severityValue = excelData.severities[`sv_${index + 1}`];
        const hazardValue = excelData.hazards[`hzi_${index + 1}`];
        worksheet.addRow(["Hazard Identification " + (index + 1), frequencyValue, severityValue, hazardValue]);
    });

    worksheet.addRow(["Controls"]);
    let hazardIndex = 1;
    Object.values(excelData.controls).forEach((value) => {
        worksheet.addRow(["Hazard Control " + hazardIndex, value]);
        hazardIndex++;
    });

    worksheet.addRow(["Comments"]);
    Object.values(excelData.comments).forEach((comment, index) => {
        worksheet.addRow(["Comment " + (index + 1), comment]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

module.exports = excelCreator;
