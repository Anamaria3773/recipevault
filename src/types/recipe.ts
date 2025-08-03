export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookingTime: number;
  category: string;
  image: string;
}