"use client";

import { useEffect } from "react";
import { RecipeDetailView } from "@/components/recipe-detail-view";
import { useAudioPlayer } from "@/components/audio-player-context";

interface RecipeDetailWithSoundProps {
	id: string;
}

export function RecipeDetailWithSound({ id }: RecipeDetailWithSoundProps) {
	const { playSound } = useAudioPlayer();

	return <RecipeDetailView id={id} />;
}
