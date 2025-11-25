import { ImageSourcePropType } from "react-native";

// Define the type for a single outfit item
export interface Outfit {
  id: string;
  image: ImageSourcePropType;
  style: string; // NEW: category of outfit
}

export const outfitsData: Outfit[] = [
  {
    id: "Party",
    image: require("./images/dress.jpg"),
    style: "Party",
  },
  {
    id: "Formal",
    image: require("./images/formal.jpg"),
    style: "Formal",
  },
  {
    id: "Classic",
    image: require("./images/clasic.jpg"),
    style: "Classic",
  },
  {
    id: "Sport",
    image: require("./images/sport.jpg"),
    style: "Sport",
  },
  {
    id: "Summer",
    image: require("./images/summer.jpg"),
    style: "Summer",
  },
  {
    id: "Casual",
    image: require("./images/casual.jpg"), 
    style: "Casual",
  },
];
