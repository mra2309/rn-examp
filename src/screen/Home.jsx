import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, Image, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";

export default function Home() {
  const [data, setData] = useState([]);
  const doubleTapRef = useRef(0);
  const url = "https://eabc-103-3-220-97.ngrok-free.app/favorit";

  const handleDoubelTab = (data) => {
    const now = Date.now();
    if (now - doubleTapRef.current < 30) {
      console.log(data);
      addToFav(data);
    }
    doubleTapRef.current = now;
  };

  const addToFav = (data) => {
    let exist = false;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          if (data == item.image) {
            exist = true;
          }
        });
        if (exist) {
          //jika datanya ada
          Alert.alert("Sudah Ada Gambar Tersebut di Favorit");
        } else {
          //jika datanya tidak di temukan
          saveFav(data);
        }
      });
  };

  const saveFav = (data) => {
    let payload = {
      image: data,
    };
    console.log(payload);
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        Alert.alert("simpan berhasil!");
        console.log(res);
      });
  };

  const getDataSibe = () => {
    fetch("http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  };

  useEffect(() => {
    getDataSibe();
  }, []);

  return (
    <View style={{ flex: 2, gap: 10 }}>
      <FlatList
        data={data}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <TapGestureHandler
            numberOfTaps={2}
            onHandlerStateChange={() => {
              handleDoubelTab(item);
            }}
          >
            <Image
              style={{ width: "45%", height: 200, margin: 10 }}
              source={{
                uri: item,
              }}
            />
          </TapGestureHandler>
        )}
        keyExtractor={(item, index) => item}
      />
      <Button
        title="Generate"
        onPress={() => {
          getDataSibe();
        }}
      />
    </View>
  );
}
