// Define the type for a single outfit item
import { ImageSourcePropType } from "react-native";
export interface Outfit {
  id: string;
  image: ImageSourcePropType; // URL or local path to the image
}

// 15 images stored locally inside: ./images/
export const outfitsData: Outfit[] = [
  { id: "1", image: require("./images/backpack.jpg") },
  { id: "2", image: require("./images/bag.png") },
  { id: "3", image: require("./images/blouse.png") },
  { id: "4", image: require("./images/boots.png") },
  { id: "5", image: require("./images/coat.png") },
  { id: "6", image: require("./images/dress.jpg") },
  { id: "7", image: require("./images/jeans.jpg") },
  { id: "8", image: require("./images/pants.png") },
  { id: "9", image: require("./images/sandals.jpg") },
  { id: "10", image: require("./images/shirt.jpg") },
  { id: "11", image: require("./images/shorts.jpg") },
  { id: "12", image: require("./images/skirt.jpg") },
  { id: "13", image: require("./images/sneakers.png") },
  { id: "14", image: require("./images/sweater-143.png") },
  { id: "15", image: require("./images/t-shirt.png") },
];
