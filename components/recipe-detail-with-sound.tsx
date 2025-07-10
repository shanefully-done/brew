"use client";

import { RecipeDetailView } from "@/components/recipe-detail-view";
import { useFeedback } from "@/components/feedback-context";

interface RecipeDetailWithSoundProps {
	id: string;
}

export function RecipeDetailWithSound({ id }: RecipeDetailWithSoundProps) {
	useFeedback(); // Call useFeedback to ensure context is initialized

	return <RecipeDetailView id={id} />;
}
