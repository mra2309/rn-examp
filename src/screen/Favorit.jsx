import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, View } from "react-native";

export default function Favorit() {
  const [data, setData] = useState([]);
  const url = "https://eabc-103-3-220-97.ngrok-free.app/favorit";

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
          //   <TapGestureHandler
          //     numberOfTaps={2}
          //     onHandlerStateChange={() => {
          //       handleDoubelTab(item);
          //     }}
          //   >
          <Image
            style={{ width: "45%", height: 200, margin: 10 }}
            source={{
              uri: item.image,
            }}
          />
          //   </TapGestureHandler>
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}
