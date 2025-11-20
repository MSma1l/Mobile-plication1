import { useState } from 'react';
import { Outfit, outfitsData } from './outfitsData';

// Define a type for the return value of the custom hook
export interface MyOutfitsLogic {
  outfits: Outfit[];
  categories: string[];
  activeCategory: string;
  likedOutfits: Set<string>;
  selectCategory: (category: string) => void;
  handleGenerate: () => void;
  toggleLike: (id: string) => void;
}

// A custom hook to handle the screen logic
export const useMyOutfits = (): MyOutfitsLogic => {
  // State for outfits, explicitly typed as Outfit[]
  const [outfits] = useState<Outfit[]>(outfitsData);
  
  // State for the active category
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // State for liked outfits (using Set<string> for better performance)
  const [likedOutfits, setLikedOutfits] = useState<Set<string>>(new Set());

  // List of categories
  const categories: string[] = ['All', 'Casual', 'Sport', 'Formal', 'Party', 'Travel', 'Seasonal'];

  // Function to change the selected category
  const selectCategory = (category: string): void => {
    setActiveCategory(category);
    console.log('Selected category:', category);
    // Future implementation could filter the 'outfits' based on the category
  };

  // Function for the "Generate outfits" button
  const handleGenerate = (): void => {
    console.log('Generate outfits pressed');
    // Future implementation: logic to generate new outfits
  };

  // Function to toggle like status
  const toggleLike = (id: string): void => {
    setLikedOutfits(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  // Return state and functions
  return {
    outfits,
    categories,
    activeCategory,
    likedOutfits,
    selectCategory,
    handleGenerate,
    toggleLike,
  };
};