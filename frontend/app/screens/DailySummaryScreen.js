import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import useHook from "@/helper/useHook";
import {
  deleteAll,
  diaryDatesKey,
  getDiaryKey,
  getKey,
} from "@/helper/async-storage";
import Diary from "@/components/daily-summary-screen/Diary";
import DateHeader from "@/components/daily-summary-screen/DateHeader";
import DailyProgress from "@/components/daily-summary-screen/DailyProgress";
import MyError from "@/components/MyError";

export default function DailySummaryScreen() {
  // NOTE: when I refer to today or date, I mean this format: MM/dd/yyyy
  const [dateIdx, setDateIdx] = useState();
  const [{ res: dates, loading: datesLoading, err: datesErr }, getKeyWrapper] =
    useHook(getKey);
  useEffect(() => {
    async function initState() {
      await getKeyWrapper(diaryDatesKey);
    }

    initState();
  }, []);
  if (dateIdx === undefined && dates?.length > 0) {
    setDateIdx(dates.length - 1);
  }

  const [
    { res: food, loading: foodLoading, err: foodErr },
    getDiaryKeyWrapper,
  ] = useHook(getDiaryKey);
  useEffect(() => {
    if (dateIdx === undefined || dates?.[dateIdx] === undefined) {
      return;
    }

    const currentDate = dates[dateIdx];
    getDiaryKeyWrapper(currentDate);
  }, [dateIdx]);

  if (datesLoading) {
    return;
  }
  if (datesErr) {
    return <MyError />;
  }
  if (dates === null) {
    return;
  }
  if (dates.length === 0) {
    return <Text>Your diary is empty.</Text>;
  }
  return (
    <View>
      <DateHeader dates={dates} dateIdx={dateIdx} setDateIdx={setDateIdx} />
      {/* <DailyProgress data={data} /> */}
      <Diary food={food} />
    </View>
  );
}
