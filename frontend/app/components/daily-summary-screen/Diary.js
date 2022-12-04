import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DiaryDelete from "./diary/DiaryDelete";
import DiaryEntry from "./diary/DiaryEntry";

export default function Diary({ food, date, refresh }) {
  return (
    <View>
      <FlatList
        ListHeaderComponent={<Text>Daily Diary</Text>}
        data={food}
        keyExtractor={(key, i) => key.id + "-" + i}
        renderItem={({ item: { food } }) => <DiaryEntry food={food} />}
        ListFooterComponent={<DiaryDelete date={date} refresh={refresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
