"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRecipes } from "@/hooks/use-recipes";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFeedback } from "@/components/feedback-context";

interface RecipeDetailViewProps {
	id: string;
}

const VIBRANT_COLORS = [
	"#3b82f6", // blue
	"#10b981", // emerald
	"#f97316", // orange
	"#ec4899", // pink
	"#8b5cf6", // violet
	"#22d3ee", // cyan
	"#f43f5e", // rose
	"#a3e635", // lime
	"#eab308", // amber
	"#6366f1", // indigo
];

export const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ id }) => {
	const { recipes } = useRecipes();
	const recipe = recipes.find((r) => r.id === id);

	const [timeRemaining, setTimeRemaining] = useState(0);
	const [currentStageIndex, setCurrentStageIndex] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const isInitialMount = useRef(true); // Ref to track initial mount
	const { playSound, vibrate } = useFeedback(); // Get playSound and vibrate from context

	const totalRecipeDuration = recipe
		? (recipe.stages?.reduce((acc, stage) => acc + (stage.duration || 0), 0) ||
				0) + (recipe.drainTime || 0)
		: 0;

	useEffect(() => {
		if (recipe) {
			const totalDuration =
				(recipe.stages?.reduce((acc, stage) => acc + (stage.duration || 0), 0) ||
					0) + (recipe.drainTime || 0);
			setTimeRemaining(totalDuration);
		}
	}, [recipe]);

	useEffect(() => {
		if (isRunning && timeRemaining > 0) {
			timerRef.current = setInterval(() => {
				setTimeRemaining((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeRemaining === 0) {
			setIsRunning(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isRunning, timeRemaining]);

	useEffect(() => {
		if (recipe) {
			const elapsed = totalRecipeDuration - timeRemaining;
			let currentCumulativeDuration = 0;
			if (recipe.stages) {
				for (let i = 0; i < recipe.stages.length; i++) {
					currentCumulativeDuration += recipe.stages[i].duration || 0;
					if (elapsed < currentCumulativeDuration) {
						setCurrentStageIndex(i);
						break;
					}
				}
				// Handle drain time as the last stage
				if (
					elapsed >= currentCumulativeDuration &&
					recipe.drainTime &&
					recipe.drainTime > 0
				) {
					setCurrentStageIndex(recipe.stages.length); // Index after the last stage
				}
			}
		}
	}, [timeRemaining, recipe, totalRecipeDuration]);

	// Effect to play sound when a stage completes
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return; // Do not play sound on initial mount
		}

		if (!recipe || !recipe.stages) {
			return;
		}

		let cumulativeDurationOfPreviousStages = 0;
		for (let i = 0; i < currentStageIndex; i++) {
			if (recipe.stages[i]) {
				cumulativeDurationOfPreviousStages += recipe.stages[i].duration || 0;
			}
		}

		let currentStageDuration = 0;
		if (currentStageIndex < recipe.stages.length) {
			currentStageDuration = recipe.stages[currentStageIndex].duration || 0;
		} else if (currentStageIndex === recipe.stages.length && recipe.drainTime) {
			currentStageDuration = recipe.drainTime;
		}

		const timeWhenCurrentStageEnds =
			totalRecipeDuration -
			(cumulativeDurationOfPreviousStages + currentStageDuration);

		// Play sound if timeRemaining is exactly at the point where the current stage ends
		// And it's not the very end of the recipe (timeRemaining === 0) unless it's the last stage completion
		if (
			isRunning &&
			timeRemaining === timeWhenCurrentStageEnds &&
			timeRemaining !== 0
		) {
			playSound();
			vibrate();
		}

		// Special case for the very last stage (drain time or last regular stage)
		// When timeRemaining becomes 0, it means the entire recipe is complete.
		// The sound should play for the completion of the *last* stage.
		if (
			isRunning &&
			timeRemaining === 0 &&
			currentStageIndex === recipe.stages.length
		) {
			playSound();
			vibrate();
		}
	}, [
		timeRemaining,
		currentStageIndex,
		recipe,
		totalRecipeDuration,
		isRunning,
		playSound,
		vibrate,
	]);

	// Effect to play sound when currentStageIndex changes, but not on initial mount

	const handleSkipStage = () => {
		if (!recipe || !recipe.stages || currentStageIndex >= recipe.stages.length) {
			// Cannot skip if no recipe or already at the last stage (including drain time)
			return;
		}

		let cumulativeDurationUpToCurrentStage = 0;
		if (recipe.stages) {
			for (let i = 0; i < currentStageIndex; i++) {
				// Changed to < currentStageIndex
				cumulativeDurationUpToCurrentStage += recipe.stages[i].duration || 0;
			}
			if (currentStageIndex < recipe.stages.length) {
				// If not at drain stage
				cumulativeDurationUpToCurrentStage +=
					recipe.stages[currentStageIndex].duration || 0;
			} else if (currentStageIndex === recipe.stages.length) {
				// If currently at drain stage
				cumulativeDurationUpToCurrentStage = totalRecipeDuration; // Set to total duration to skip past drain
			}
		}

		// Calculate the time remaining if we were to jump to the end of the current stage
		const newTimeRemaining =
			totalRecipeDuration - cumulativeDurationUpToCurrentStage;

		setTimeRemaining(newTimeRemaining);
		setCurrentStageIndex((prevIndex) => prevIndex + 1);
		setIsRunning(true); // Continue running after skipping
	};

	const handleStart = () => setIsRunning(true);
	const handlePause = () => setIsRunning(false);
	const handleReset = () => {
		setIsRunning(false);
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		if (recipe) {
			const totalDuration =
				(recipe.stages?.reduce((acc, stage) => acc + (stage.duration || 0), 0) ||
					0) + (recipe.drainTime || 0);
			setTimeRemaining(totalDuration);
			setCurrentStageIndex(0);
		}
	};

	if (!recipe) {
		return <div>Recipe not found.</div>;
	}

	const progressValue =
		totalRecipeDuration > 0
			? ((totalRecipeDuration - timeRemaining) / totalRecipeDuration) * 100
			: 0;
	const currentStage =
		currentStageIndex < (recipe.stages?.length || 0)
			? recipe.stages?.[currentStageIndex]
			: {
					name: "Drain",
					duration: recipe.drainTime || 0,
					instructions: "Allow to drain",
			  };

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>{recipe.name || "Untitled Recipe"}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<p>
						<strong>Brewer:</strong> {recipe.brewer || "N/A"}
					</p>
					<p>
						<strong>Dose:</strong> {recipe.dose ? `${recipe.dose}g` : "N/A"}
					</p>
					<p>
						<strong>Water:</strong> {recipe.water ? `${recipe.water}ml` : "N/A"}
					</p>
					<p>
						<strong>Ratio:</strong> {recipe.ratio ? `1:${recipe.ratio}` : "N/A"}
					</p>
					<p>
						<strong>Temperature:</strong>{" "}
						{recipe.temperature ? `${recipe.temperature}°C` : "N/A"}
					</p>
					<p>
						<strong>Grind Size:</strong> {recipe.grindSize || "N/A"}
					</p>
				</div>

				<Separator className="my-4" />

				<h3 className="text-lg font-semibold mb-2">Timer</h3>
				<div className="text-center text-4xl font-bold mb-4">
					{Math.floor(timeRemaining / 60)
						.toString()
						.padStart(2, "0")}
					:{(timeRemaining % 60).toString().padStart(2, "0")}
				</div>
				<Progress
					value={progressValue}
					className="w-full mb-4"
					style={{
						backgroundColor:
							VIBRANT_COLORS[currentStageIndex % VIBRANT_COLORS.length],
					}}
				/>
				<div className="flex justify-center space-x-2 mb-4">
					<Button onClick={handleStart} disabled={isRunning || timeRemaining === 0}>
						Start
					</Button>
					<Button onClick={handlePause} disabled={!isRunning}>
						Pause
					</Button>
					<Button onClick={handleReset}>Reset</Button>
					<Button
						onClick={handleSkipStage}
						disabled={
							!isRunning || !recipe.stages || currentStageIndex >= recipe.stages.length
						}
					>
						Skip Stage
					</Button>
				</div>

				<Separator className="my-4" />

				<h3 className="text-lg font-semibold mb-2">Current Stage</h3>
				{currentStage ? (
					<div>
						<p>
							<strong>Name:</strong> {currentStage.name}
						</p>
						<p>
							<strong>Instructions:</strong> {currentStage.instructions}
						</p>
					</div>
				) : (
					<p>No active stage.</p>
				)}

				<Separator className="my-4" />

				<h3 className="text-lg font-semibold mb-2">All Stages</h3>
				<ul>
					{recipe.stages?.map((stage, index) => (
						<li
							key={index}
							className={index === currentStageIndex ? "font-bold" : ""}
						>
							{stage.name || "Untitled Stage"} ({stage.duration || 0}s):{" "}
							{stage.instructions || "No instructions"}
						</li>
					))}
					{recipe.drainTime && recipe.drainTime > 0 && (
						<li
							className={
								currentStageIndex === recipe.stages?.length ? "font-bold" : ""
							}
						>
							Drain ({recipe.drainTime}s): Allow to drain
						</li>
					)}
				</ul>
				<div className="flex justify-end mt-4">
					<Link href={`/recipe/edit/${recipe.id}`}>
						<Button>Edit Recipe</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
