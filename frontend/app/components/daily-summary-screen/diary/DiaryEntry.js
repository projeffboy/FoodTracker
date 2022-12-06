import { View, Text } from "react-native";

import Unorderedlist from "react-native-unordered-list";

export default DiaryEntry = ({
  foodEntry: { food, servings, servingSizeNum, servingSizeUnit },
}) => {
  return (
    <View>
      <Unorderedlist>
        <Text>
          {servings} {food} - {servingSizeNum} {servingSizeUnit}
        </Text>
      </Unorderedlist>
    </View>
  );
};
