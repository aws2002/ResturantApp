import { View, Text, ScrollView } from "react-native";
import { useState,useEffect } from "react";
import CategoryCard from "./CategoryCard";
import tw from "twrnc";
import { client } from "../../sanity";
const Categories = () => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    client.fetch(`
    *[_type=="category"]
    `).then(data=>setCategories(data))
    },[])
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      style={tw`bg-neutral-900`}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((item)=>(
        <CategoryCard
        imgUrl={item.image}
        title={item.name}
        key={item._id}
      />
      ))}
    </ScrollView>
  );
};

export default Categories;
