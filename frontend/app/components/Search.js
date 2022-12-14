import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import theme from "@/config/theme";

export default Search = ({ term, setTerm, submit }) => (
  <View style={styles.searchBar}>
    <FontAwesome name="search" size={24} color={theme.medium} />
    <TextInput
      style={styles.searchText}
      placeholder="Search food"
      value={term}
      onChangeText={text => setTerm(text)}
      returnKeyType="search"
      onSubmitEditing={submit}
      enablesReturnKeyAutomatically
      cursorColor={theme.medium}
      autoCorrect={false}
    />
    <TouchableOpacity>
      <FontAwesome5
        name="times-circle"
        size={24}
        color={theme.medium}
        style={styles.closeSearch}
        onPress={() => setTerm("")}
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
