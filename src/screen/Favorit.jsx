import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
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

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <Image
          source={{
            uri: imageSource,
          }}
          style={styles.image}
        />
      </View>
    </Swipeable>
  );
};

export default function Favorit() {
  const [data, setData] = useState([]);
  const url =
    "https://6536-2001-448a-4010-1bc2-a40f-72f3-2289-7d3d.ngrok-free.app/favorit";

  const getDataFav = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  };

  useEffect(() => {
    getDataFav();
  }, []);

  const handleDelete = (id) => {
    // Logic for deleting item
    console.log("Item deleted!", id);
  };

  return (
    <View>
      <Button
        title="refresh"
        onPress={() => {
          getDataFav();
        }}
      />
      <FlatList
        data={data}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <SwipeableItem
            text="Swipe me"
            imageSource={item.image}
            onDelete={handleDelete(item.id)}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 150,
    width: 410,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure the image does not overflow
    borderRadius: 8,
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
