/*
The component below (RecursiveDisplay) is taken from chatgpt

Propmpt: 
{
  "Name": "Sourav",
  "Country": "India",
  "Employees present?": [
    "Chris",
    "sourav"
  ],
  "Emergency response plan": {
    "Do you know the plan?": "Yes",
    "Are you aware of what to do in case of emergency?": "No"
  },
  "Locations worked on previously": [
    "SAIT",
    "NAIT"
  ],
  "What will be the best way to make eggs?": {
    "Explain": {
      "comments": "Here is the explanation",
      "response": "Yes"
    },
    "Do you know?": {
      "comments": "I do know the way to make eggs",
      "response": "Yes"
    }
  }
}

I have this json data i want to show it in my react app. How can i map over it recursively and display the data?

*/

const RecursiveDisplay = ({ data }: { data: any }) => {
    // Recursive function to map over the object
    const renderData = (data: any) => {
        // Check if the data is an array or object
        if (Array.isArray(data)) {
            return (
                <ul>
                    {data.map((item, index) => (
                        <li className="pl-2" key={index}>
                            {renderData(item)}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof data === "object" && data !== null) {
            return (
                <ul>
                    {Object.entries(data).map(([key, value]) => (
                        <li className="pl-2" key={key}>
                            <strong>{key}:</strong> {renderData(value)}
                        </li>
                    ))}
                </ul>
            );
        }
        // If it's a primitive value (string, number, boolean), display it
        return <span>{String(data)}</span>;
    };

    return <div>{renderData(data)}</div>;
};

export default RecursiveDisplay;
