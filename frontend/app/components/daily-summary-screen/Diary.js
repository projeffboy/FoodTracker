import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DiaryDelete from "./diary/DiaryDelete";
import DiaryEntry from "./diary/DiaryEntry";

export default function Diary({ food }) {
  return (
    <View>
      <FlatList
        data={food}
        keyExtractor={(key, i) => key.id + "-" + i}
        ListHeaderComponent={<Text>Daily Diary</Text>}
        renderItem={({ item }) => <DiaryEntry food={item.food} />}
      />
      <DiaryDelete
        fmtDate={fmtDate}
        refresh={() => getDiaryKeyWrapper(fmtDate)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
