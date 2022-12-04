import { Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function NutritionEntry({
  styles,
  nutrient,
  value,
  dailyValuePercent,
  stdNutrient: { hide0Pct, indent, bold, italic, borderBottomStyleName },
}) {
  const [loaded] = useFonts({
    "Helvetica-Italic": require("@/assets/fonts/Helvetica-Italic.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View
      style={[
        styles[borderBottomStyleName || "thinBorderBottom"],
        styles.entry,
        {
          paddingLeft: indent ? 18 : 0,
        },
      ]}
    >
      <View style={styles.entry}>
        {italic ? (
          <>
            <Text style={[styles.text, { fontFamily: "Helvetica-Italic" }]}>
              {nutrient.split(" ")[0] + " "}
            </Text>
            <Text style={styles[bold ? "boldText" : "text"]}>
              {nutrient.split(" ").slice(1)}{" "}
            </Text>
          </>
        ) : (
          <Text style={styles[bold ? "boldText" : "text"]}>{nutrient} </Text>
        )}
        <Text style={styles.text}>{value}</Text>
      </View>
      <Text style={styles[bold || indent ? "boldText" : "text"]}>
        {!(hide0Pct && dailyValuePercent === 0) && dailyValuePercent + "%"}
      </Text>
    </View>
  );
}
