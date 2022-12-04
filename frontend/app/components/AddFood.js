import { Ionicons } from "@expo/vector-icons";

import { addToDiaryWithFeedback } from "@/helper/toast";
import MyButton from "./MyButton";
import theme from "@/config/theme";

export default function AddFood({ foodEntry }) {
  const color = theme.iosBlue;

  return (
    <MyButton
      text="Add to Diary"
      onPress={() => addToDiaryWithFeedback(foodEntry)}
      icon={<Ionicons name="ios-add-circle" size={24} color={color} />}
      buttonStyle={{ padding: 0 }}
      textStyle={{ color, fontSize: 18 }}
    />
  );
}
