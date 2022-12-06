import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import useHook from "@/helper/useHook";
import { getDiaryDates, getDiaryDay } from "@/helper/async-storage";
import Diary from "@/components/daily-summary-screen/Diary";
import DateHeader from "@/components/daily-summary-screen/DateHeader";
import DailyProgress from "@/components/daily-summary-screen/DailyProgress";
import MyError from "@/components/MyError";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/config/theme";
import WeeklyProgress from "@/components/daily-summary-screen/WeeklyProgress";

const Tab = createBottomTabNavigator();

export default function SummaryScreen() {
  // NOTE: when I refer to today or date, I mean this format: MM/dd/yyyy
  const [dateIdx, setDateIdx] = useState();
  const [
    { res: dates, loading: datesLoading, err: datesErr },
    getDiaryDatesWrapper,
  ] = useHook(getDiaryDates);
  useEffect(() => {
    getDiaryDatesWrapper();
  }, []);
  useEffect(() => {
    if (dateIdx === undefined && dates?.length > 0) {
      setDateIdx(dates.length - 1);
    }
  }, [dates]);

  const [
    { res: food, loading: foodLoading, err: foodErr },
    getDiaryDayWrapper,
  ] = useHook(getDiaryDay);
  useEffect(() => {
    if (dateIdx === undefined || dates?.[dateIdx] === undefined) {
      return;
    }

    const currentDate = dates[dateIdx];
    getDiaryDayWrapper(currentDate);
  }, [dateIdx, dates]);

  if (datesLoading || foodLoading) {
    return;
  }
  if (datesErr || foodErr) {
    return <MyError />;
  }
  if (dates === null || dates.length === 0) {
    // dates can still be null if the key does not exist
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={styles.empty}>Your diary is empty.</Text>
      </View>
    );
  }

  const DailyProgressWrapper = () => (
    <DailyProgress styles={styles} food={food} />
  );

  const DiaryWrapper = () => (
    <Diary
      styles={styles}
      food={food}
      date={dates[dateIdx]}
      refresh={getDiaryDatesWrapper}
    />
  );

  function tabBarIcon({ color, size }, route) {
    const mapping = {
      Daily: "ios-today-outline",
      Weekly: "ios-calendar-outline",
      Diary: "ios-journal-outline",
    };

    return <Ionicons name={mapping[route.name]} size={size} color={color} />;
  }

  return (
    <>
      <DateHeader dates={dates} dateIdx={dateIdx} setDateIdx={setDateIdx} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            tabBarIcon({ focused, color, size }, route),
          tabBarInactiveTintColor: theme.medium,
          tabBarActiveTintColor: theme.iosBlue,
        })}
      >
        <Tab.Screen name="Daily" component={DailyProgressWrapper} />
        <Tab.Screen name="Weekly" component={WeeklyProgress} />
        <Tab.Screen name="Diary" component={DiaryWrapper} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 18,
    color: theme.medium,
  },
  header: {
    color: theme.dark,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  entries: {
    margin: 16,
  },
});
