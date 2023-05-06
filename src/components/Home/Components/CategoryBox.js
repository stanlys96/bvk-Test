import { Text, View } from "react-native";
import Pressable from "../../Pressable";
import tw from "../../../styles";
import { ArrowDown, ArrowUp } from "../../../icons";
import { CatBox } from "./CatBox";

export const CategoryBox = ({ cat, setCats, cats, idx }) => {
  const handleArrow = () => {
    let temp = [...cats];
    const theIdx = temp.findIndex((x) => x.id === cat.id);
    temp[theIdx].open = !temp[theIdx].open;
    setCats([...temp]);
  };
  return (
    <View>
      <View
        style={tw`flex flex-row justify-between items-center border border-black p-4 bg-cyan-300`}
      >
        <Text>{idx + 1}</Text>
        <Text>{cat.name}</Text>
        <Pressable onPress={handleArrow} smallBounce={false}>
          {cat.open ? <ArrowUp /> : <ArrowDown />}
        </Pressable>
      </View>
      {cat.open && <CatBox cat={cat} />}
    </View>
  );
};
