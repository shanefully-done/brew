"use client";

import { RecipeForm } from "@/components/recipe-form";
import { useRecipes } from "@/hooks/use-recipes";
import { useParams } from "next/navigation";

export default function EditRecipePage() {
	const { id } = useParams();
	const { recipes } = useRecipes();
	const recipe = recipes.find((r) => r.id === id);

	if (!recipe) {
		return <div className="container mx-auto py-10">Recipe not found.</div>;
	}

	return (
		<div className="container mx-auto py-10">
			<RecipeForm initialRecipe={recipe} />
		</div>
	);
}
