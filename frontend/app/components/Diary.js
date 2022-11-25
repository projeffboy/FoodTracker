import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
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
import hookCreator from "../hooks/hookCreator";

export default function Diary({ fmtDate }) {
  const [{ data, loading, error }, getDiary] = hookCreator(getDiaryKey);

  useEffect(() => {
    (async () => {
      await getDiary(fmtDate);
      console.log(data);
    })();
  }, []);

  return (
    <View>
      <DiaryDelete fmtDate={fmtDate} />
    </View>
  );
}

const styles = StyleSheet.create({});
