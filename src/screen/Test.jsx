import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, { interpolate } from "react-native-reanimated";

const SwipeableItem = ({ text, imageSource, onDelete }) => {
  const renderRightActions = (_, dragX) => {
    return (
      <RectButton onPress={onDelete} style={styles.deleteButton}>
        <Animated.Text>Delete</Animated.Text>
      </RectButton>
    );
  };

  const rightAction = (_, dragX) => {
    return (
      <RectButton onPress={onDelete} style={styles.deleteButton}>
        <Animated.Text>EDIT</Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderRightActions}
      renderRightActions={rightAction}
    >
      <View style={styles.item}>
        <Image source={imageSource} style={styles.image} />
        <Text>{text}</Text>
      </View>
    </Swipeable>
  );
};

const Test = () => {
  const handleDelete = (id) => {
    console.log("Item deleted!", id);
  };

  const imageSource = {
    uri: "https://cdn.shibe.online/shibes/62fb37d1a543b51be7533249881bba8a916e477b.jpg",
  };

  return (
    <View style={styles.container}>
      <SwipeableItem
        text="Swipe me"
        imageSource={imageSource}
        onDelete={handleDelete(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 150,
    width: 300,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure the image does not overflow
    borderRadius: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "white",
  },
});

export default Test;
