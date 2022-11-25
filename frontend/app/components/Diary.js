import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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

export default function Diary({ fmtDate }) {
  const [{ data, loading, error }, getDiaryKeyWrapper] = useHook(getDiaryKey);

  useEffect(() => {
    getDiaryKeyWrapper(fmtDate);
  }, []);

  function entries() {
    if (loading) {
      return <Text>Loading</Text>; // this shouldn't appear to the naked eye
    } else if (error) {
      return <MyError />;
    } else if (data && data?.length > 0) {
      return <Text>{data.map(food => food.food)}</Text>;
    } else {
      return <Text>No entries.</Text>;
    }
  }

  return (
    <View>
      {entries()}
      <DiaryDelete
        fmtDate={fmtDate}
        refresh={() => getDiaryKeyWrapper(fmtDate)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
