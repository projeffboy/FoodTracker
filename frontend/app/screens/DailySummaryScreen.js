import { View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Diary from "../components/Diary";
import { useState } from "react";
import DateHeader from "../components/DateHeader";

export default function DailySummaryScreen() {
  const [numDaysBefore, setNumDaysBefore] = useState(0);

  function getDate() {
    const date = new Date();
    if (numDaysBefore !== 0) {
      date.setDate(date.getDate() - numDaysBefore);
    }

    return date;
  }

  return (
    <RootSiblingParent>
      <View>
        <DateHeader
          numDaysBefore={numDaysBefore}
          setNumDaysBefore={setNumDaysBefore}
          getDate={getDate}
        />

        <Diary fmtDate={getDate().toLocaleDateString()} />
      </View>
    </RootSiblingParent>
  );
}
