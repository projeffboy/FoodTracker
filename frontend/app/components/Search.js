import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import theme from "../config/theme";

function Search({ initialInput = "", atFoodList, navigation }) {
  const [input, setInput] = useState(initialInput);

  return (
    <View style={styles.searchBar}>
      <FontAwesome name="search" size={24} color={theme.medium} />
      <TextInput
        style={styles.searchText}
        placeholder="Search food"
        value={input}
        onChangeText={text => setInput(text)}
        returnKeyType="search"
        onSubmitEditing={() =>
          input.trim() &&
          !atFoodList &&
          navigation.navigate("FoodList", { searchTerm: input })
        }
      />
      <TouchableOpacity>
        <FontAwesome5
          name="times-circle"
          size={24}
          color={theme.medium}
          style={styles.closeSearch}
          onPress={() => setInput("")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5
          name="arrow-alt-circle-down"
          size={24}
          color={theme.medium}
          onPress={Keyboard.dismiss}
        />
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Search);

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 2,
    borderColor: theme.medium,
    padding: 16,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    color: theme.dark,
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  closeSearch: {
    paddingHorizontal: 12,
  },
});
