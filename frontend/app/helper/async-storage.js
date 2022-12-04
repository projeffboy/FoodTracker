import AsyncStorage from "@react-native-async-storage/async-storage";
import { isMissingDetails } from "./nutrition";

// foodEntry schema:
// {
//   id: Number,
//   food: String,
//   nutrients: Object,
//   servings: Number,
//   servingSizeNum: Number,
//   servingSizeUnit: String,
//   servingGrams: Number,
// }

export async function addToDiary(foodEntry) {
  try {
    if (isMissingDetails(foodEntry)) {
      throw "foodEntry is missing details";
    }

    const date = new Date().toLocaleDateString(); // formatted date
    await addEntry(date, foodEntry);
    await addDate(date);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

async function addEntry(fmtDate, foodEntry) {
  // Get value from key
  const key = "@diary:" + fmtDate;
  let diaryDay = await AsyncStorage.getItem(key);
  diaryDay = JSON.parse(diaryDay) || [];
  // Update value and put it back in key
  const newEntry = foodEntry;
  diaryDay.push(newEntry);
  AsyncStorage.setItem(key, JSON.stringify(diaryDay));
}

export const diaryDatesKey = "@diaryDates";

// format: MM/dd/YYYY
async function addDate(date) {
  // Get value from key
  const key = diaryDatesKey;
  let diaryDates = await AsyncStorage.getItem(key);
  diaryDates = JSON.parse(diaryDates) || [];
  // Update value and put it back in key
  if (!diaryDates.includes(date)) {
    diaryDates.push(date);
  }
  AsyncStorage.setItem(key, JSON.stringify(diaryDates));
}

export async function getDiaryKey(key) {
  return await getKey("@diary:" + key);
}

export async function getKey(key) {
  try {
    const food = await AsyncStorage.getItem(key);

    return JSON.parse(food);
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function deleteKey(key) {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export async function deleteAll() {
  try {
    await AsyncStorage.clear();

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}
