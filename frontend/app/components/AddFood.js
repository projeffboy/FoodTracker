import { Ionicons } from "@expo/vector-icons";

import { addToDiaryWithFeedback } from "@/helper/toast";
import MyButton from "./MyButton";
import theme from "@/config/theme";

export default function AddFood({ id, food, nutrients }) {
  const color = theme.iosBlue;

  return (
    <MyButton
      text="Add to Diary"
      onPress={() => addToDiaryWithFeedback(id, food, nutrients)}
      icon={<Ionicons name="ios-add-circle" size={24} color={color} />}
      textStyle={{
        color,
        fontSize: 18,
      }}
    />
  );
}
