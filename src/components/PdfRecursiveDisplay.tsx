/*
The component below (PdfRecursiveDisplay) is taken from chatgpt

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
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    textBlock: {
        paddingLeft: 10,
        marginBottom: 4,
        flexWrap: "wrap", // Ensures text wraps within the container
        wordBreak: "break-word", // Allows breaking long words
    },
    viewBlock: {
        marginBottom: 8, // Adds space between blocks
    },
});

const PdfRecursiveDisplay = ({ data }: { data: any }) => {
    // Recursive function to map over the object
    const renderData = (data: any) => {
        // Check if the data is an array or object
        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <View key={index} style={styles.viewBlock}>
                    <Text>{renderData(item)}</Text>
                </View>
            ));
        } else if (typeof data === "object" && data !== null) {
            return (
                <View>
                    {Object.entries(data).map(([key, value]) => (
                        <View key={key} style={styles.viewBlock}>
                            <Text style={styles.textBlock}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {key}:
                                </Text>{" "}
                                {renderData(value)}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        }
        // If it's a primitive value (string, number, boolean), display it
        return <Text>{String(data)}</Text>;
    };

    return <View>{renderData(data)}</View>;
};
export default PdfRecursiveDisplay;
