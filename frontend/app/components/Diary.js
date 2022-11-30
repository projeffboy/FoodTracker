import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect } from "react";
import MyButton from "./MyButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../config/theme";
import showToast from "../helper/toast";
import {
  deleteAll,
  deleteKey,
  getDiaryKey,
  getKey,
} from "../helper/async-storage";
import DiaryDelete from "./DiaryDelete";
import useHook from "../helper/useHook";
import MyError from "./MyError";
import DiaryEntry from "./DiaryEntry";

export default function Diary({ data, fmtDate, getDiaryKeyWrapper }) {
  return (
    <View>
      <FlatList
        data={data}
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
