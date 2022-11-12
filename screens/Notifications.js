import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";

export default function Notifications() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}
