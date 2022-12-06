import theme from "@/config/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DiaryDelete from "./diary/DiaryDelete";
import DiaryEntry from "./diary/DiaryEntry";

export default Diary = ({ styles, food, date, refresh }) => (
  <View style={styles.entries}>
    <FlatList
      ListHeaderComponent={<Text style={styles.header}>Foods Logged</Text>}
      data={food}
      keyExtractor={(key, i) => key.id + "-" + i}
      renderItem={({ item: foodEntry }) => <DiaryEntry foodEntry={foodEntry} />}
      ListFooterComponent={<DiaryDelete date={date} refresh={refresh} />}
    />
  </View>
);
