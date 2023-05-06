import { Text, View, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "../../../styles";
import axios from "axios";

export const CatBox = ({ cat }) => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`)
      .then(async (result) => {
        setImageUri(result.data.url);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <View style={tw`border-l border-r border-b border-black p-6`}>
      <View style={tw`mb-[15px] flex justify-center items-center`}>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={tw`h-[100px] w-[100px]`}
            color="#00ff00"
          />
        ) : imageUri ? (
          <Image
            style={tw`h-[100px] w-[100px]`}
            source={{
              uri: imageUri,
            }}
          />
        ) : null}
      </View>
      <View style={tw`mb-[15px]`}>
        <Text style={tw`underline font-bold`}>Description: </Text>
        <Text>{cat.description}</Text>
      </View>

      <View style={tw`mb-[15px]`}>
        <Text style={tw`underline font-bold`}>Adaptability: </Text>
        <Text>{cat.adaptability}</Text>
      </View>
      <View>
        <Text style={tw`underline font-bold`}>Country Code: </Text>
        <Text>{cat.country_code}</Text>
      </View>
    </View>
  );
};
