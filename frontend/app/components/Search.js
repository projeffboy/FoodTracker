import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const light = "#eee";
const medium = "grey";
const dark = "#222";

const Search = () => {
  const [input, setInput] = useState("");

  return (
    <View style={styles.searchBar}>
      <FontAwesome name="search" size={24} color={medium} />
      <TextInput
        style={styles.searchText}
        placeholder="Search food"
        value={input}
        onChangeText={text => setInput(text)}
      />
      <TouchableOpacity>
        <FontAwesome5
          name="times-circle"
          size={24}
          color={medium}
          style={styles.closeSearch}
          onPress={() => setInput("")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5
          name="arrow-alt-circle-down"
          size={24}
          color={medium}
          onPress={Keyboard.dismiss}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 2,
    borderColor: medium,
    padding: 16,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    color: dark,
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  closeSearch: {
    paddingHorizontal: 12,
  },
});
