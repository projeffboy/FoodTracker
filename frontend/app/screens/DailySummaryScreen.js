import { Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect, useState } from "react";

import useHook from "@/helper/useHook";
import { getDiaryKey } from "@/helper/async-storage";
import Diary from "@/components/daily-summary-screen/Diary";
import DateHeader from "@/components/daily-summary-screen/DateHeader";
import DailyProgress from "@/components/daily-summary-screen/DailyProgress";
import MyError from "@/components/MyError";

export default function DailySummaryScreen() {
  const [numDaysBefore, setNumDaysBefore] = useState(0);

  const [{ data, loading, error }, getDiaryKeyWrapper] = useHook(getDiaryKey);

  useEffect(() => {
    getDiaryKeyWrapper(getDate().toLocaleDateString());
  }, [numDaysBefore]);

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
        <DailyProgress data={data} />
        <Diary
          data={data}
          fmtDate={getDate().toLocaleDateString()}
          getDiaryKeyWrapper={getDiaryKeyWrapper}
        />
      </View>
    </RootSiblingParent>
  );
}
