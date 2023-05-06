import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { Text, View, ScrollView, TextInput, SafeAreaView } from "react-native";
import tw from "../../styles";
import { CategoryBox } from "./Components/CategoryBox";

export const Home = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [text, setText] = useState("");

  const catFilter = (data) => {
    return data.name.toLowerCase().includes(text.toLowerCase());
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    axios
      .get(`https://api.thecatapi.com/v1/breeds?limit=${limit}&order=DESC`)
      .then(async (result) => {
        setCats(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(JSON.stringify(err));
      });
  }, [limit]);

  return (
    <SafeAreaView>
      <View style={tw`bg-gray-200 h-full py-7`}>
        <View style={tw`px-10`}>
          <Text style={tw`mb-[20px] text-center text-[30px] font-bold`}>
            Welcome to Cat World!
          </Text>
          <TextInput
            style={tw`h-[40px] m-[12px] border p-[10px] mb-[20px]`}
            onChangeText={setText}
            placeholder="Search for cats"
            value={text}
          />
          <Text style={tw`mb-[20px]`}>Total cats fetched: {cats.length}</Text>
        </View>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && text == "") {
              if (loading || limit > 61) return;
              setLimit(limit + 10);
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={tw`flex gap-y-10 px-10`}>
            {cats.filter(catFilter).map((cat, idx) => (
              <CategoryBox
                key={cat.name}
                cat={cat}
                cats={cats}
                idx={idx}
                setCats={setCats}
              />
            ))}
          </View>
          <Spinner visible={loading} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
