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

const diaryDatesKey = "@diaryDates";

/* Composite Methods */

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

async function addEntry(date, foodEntry) {
  // Get value from key
  const key = getDateKey(date);
  let diaryDay = await AsyncStorage.getItem(key);
  diaryDay = JSON.parse(diaryDay) || [];
  // Update value and put it back in key
  const newEntry = foodEntry;
  diaryDay.push(newEntry);
  AsyncStorage.setItem(key, JSON.stringify(diaryDay));
}

export async function getDiaryDates() {
  return (await getItem(diaryDatesKey)) || [];
}

// format: MM/dd/YYYY
async function addDate(date) {
  // Get value from key
  let diaryDates = await getDiaryDates();
  // Update value and put it back in key
  if (!diaryDates.includes(date)) {
    diaryDates.push(date);
  }
  AsyncStorage.setItem(diaryDatesKey, JSON.stringify(diaryDates));
}

export async function getDiaryDay(date) {
  return (await getItem(getDateKey(date))) || [];
}

export async function deleteDiaryDay(date) {
  deleteItem(getDateKey(date));
  let diaryDates = await getDiaryDates();
  diaryDates = diaryDates.filter(diaryDate => diaryDate !== date);
  AsyncStorage.setItem(diaryDatesKey, JSON.stringify(diaryDates));

  return true;
}

/* Basic Methods */
const getDateKey = date => "@diary:" + date;

async function getItem(key) {
  try {
    const food = await AsyncStorage.getItem(key);

    return JSON.parse(food);
  } catch (e) {
    console.error(e);

    return null;
  }
}

async function deleteItem(key) {
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
