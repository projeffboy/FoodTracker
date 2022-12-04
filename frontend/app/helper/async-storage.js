import AsyncStorage from "@react-native-async-storage/async-storage";

// food as in food name
export async function addToDiary(id, food, nutrients) {
  try {
    if (id === undefined || food === undefined || nutrients === undefined) {
      throw "One of id, food, or nutrients is missing.";
    }

    const date = new Date().toLocaleDateString(); // formatted date
    await addEntry(date, id, food, nutrients);
    await addDate(date);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

async function addEntry(fmtDate, id, food, nutrients) {
  // Get value from key
  const key = "@diary:" + fmtDate;
  let diaryDay = await AsyncStorage.getItem(key);
  diaryDay = JSON.parse(diaryDay) || [];
  // Update value and put it back in key
  const newEntry = { id, food, nutrients };
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
