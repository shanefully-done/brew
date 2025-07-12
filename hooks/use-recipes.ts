import { useState, useEffect } from "react";
import { Recipe } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import { v4 as uuid } from "uuid";

const LOCAL_STORAGE_KEY = "coffee-recipes";

const defaultRecipes: Recipe[] = [
	{
		id: uuidv4(),
		name: "Single",
		brewer: "Mr. Clever",
		dose: 10,
		water: 150,
		ratio: "1:15",
		temperature: 92,
		grindSize: "Pourover",
		drainTime: 30,
		stages: [
			{
				name: "Bloom",
				water: 20,
				duration: 30,
				instructions: "-",
			},
			{
				name: "Brew",
				water: 130,
				duration: 120,
				instructions: "Stir after pouring all of the water.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Singe: Ice",
		brewer: "Mr. Clever",
		dose: 13,
		water: 150,
		ratio: "1:11.54",
		temperature: 92,
		grindSize: "Pourover",
		drainTime: 30,
		stages: [
			{
				name: "Bloom",
				water: 26,
				duration: 30,
				instructions: "-",
			},
			{
				name: "Brew",
				water: 124,
				duration: 120,
				instructions: "Stir after pouring all of the water.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Double",
		brewer: "Mr. Clever",
		dose: 20,
		water: 250,
		ratio: "1:15",
		temperature: 92,
		grindSize: "Pourover",
		drainTime: 30,
		stages: [
			{
				name: "Bloom",
				water: 40,
				duration: 30,
				instructions: "-",
			},
			{
				name: "Brew",
				water: 260,
				duration: 120,
				instructions: "Stir thoroughly after pouring.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Double: Ice",
		brewer: "Mr. Clever",
		dose: 26,
		water: 250,
		ratio: "1:11.54",
		temperature: 92,
		grindSize: "Pourover",
		drainTime: 30,
		stages: [
			{
				name: "Bloom",
				water: 52,
				duration: 30,
				instructions: "-",
			},
			{
				name: "Brew",
				water: 248,
				duration: 120,
				instructions: "Stir thoroughly after pouring.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Classic V60",
		brewer: "V60",
		dose: 18,
		water: 300,
		ratio: "1:16.6",
		temperature: 93,
		grindSize: "medium-fine",
		drainTime: 60,
		stages: [
			{
				name: "Bloom",
				water: 50,
				duration: 30,
				instructions: "Pour 50g water, swirl gently.",
			},
			{
				name: "First Pour",
				water: 125,
				duration: 45,
				instructions: "Pour to 175g, circular motion.",
			},
			{
				name: "Second Pour",
				water: 125,
				duration: 45,
				instructions: "Pour to 300g, gentle pour.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Aeropress Inverted",
		brewer: "Aeropress",
		dose: 15,
		water: 250,
		ratio: "1:16.6",
		temperature: 85,
		grindSize: "medium",
		drainTime: 90,
		stages: [
			{ name: "Pour", water: 250, duration: 60, instructions: "Pour all water." },
		],
	},
	{
		id: uuidv4(),
		name: "Classic Chemex",
		brewer: "Chemex",
		dose: 30,
		water: 500,
		ratio: "1:16.6",
		temperature: 94,
		grindSize: "medium-coarse",
		drainTime: 90,
		stages: [
			{
				name: "Bloom",
				water: 80,
				duration: 45,
				instructions: "Pour 80g water, swirl to saturate.",
			},
			{
				name: "First Pour",
				water: 210,
				duration: 60,
				instructions: "Pour to 290g slowly, circular motion.",
			},
			{
				name: "Second Pour",
				water: 210,
				duration: 60,
				instructions: "Pour to 500g gently down the middle.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "Kalita 102",
		brewer: "Kalita",
		dose: 20,
		water: 320,
		ratio: "1:16",
		temperature: 92,
		grindSize: "medium",
		drainTime: 60,
		stages: [
			{
				name: "Bloom",
				water: 40,
				duration: 30,
				instructions: "Saturate evenly and swirl gently.",
			},
			{
				name: "Pulse Pour",
				water: 140,
				duration: 45,
				instructions: "Pour in slow pulses to 180g.",
			},
			{
				name: "Final Pour",
				water: 140,
				duration: 45,
				instructions: "Finish to 320g, steady center pour.",
			},
		],
	},
	{
		id: uuidv4(),
		name: "French Press Standard",
		brewer: "French Press",
		dose: 18,
		water: 300,
		ratio: "1:16.6",
		temperature: 93,
		grindSize: "coarse",
		drainTime: 0,
		stages: [
			{
				name: "Steep",
				water: 300,
				duration: 240,
				instructions: "Pour all water, stir gently, cover.",
			},
			{
				name: "Plunge",
				water: 0,
				duration: 30,
				instructions: "Plunge slowly after 4 minutes.",
			},
		],
	},
];

export function useRecipes() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const storedRecipes = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedRecipes) {
			setRecipes(JSON.parse(storedRecipes));
		} else {
			setRecipes(defaultRecipes);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultRecipes));
		}
	}, []);

	useEffect(() => {
		if (recipes.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
		}
	}, [recipes]);

	const addRecipe = (recipe: Recipe) => {
		setRecipes((prevRecipes) => [...prevRecipes, { ...recipe, id: uuidv4() }]);
	};

	const updateRecipe = (id: string, updatedRecipe: Partial<Recipe>) => {
		setRecipes((prevRecipes) =>
			prevRecipes.map((recipe) =>
				recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
			)
		);
	};

	const deleteRecipe = (id: string) => {
		setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
	};

	const importRecipes = (newRecipes: Recipe[]) => {
		setRecipes(newRecipes.map((recipe) => ({ ...recipe, id: uuidv4() })));
	};

	const duplicateRecipe = (id: string) => {
		setRecipes((prevRecipes) => {
			const originalRecipe = prevRecipes.find((recipe) => recipe.id === id);
			if (!originalRecipe) {
				return prevRecipes;
			}
			const newRecipe: Recipe = {
				...originalRecipe,
				id: uuid(),
				name: `${originalRecipe.name} (Copy)`,
			};
			return [...prevRecipes, newRecipe];
		});
	};

	const resetRecipes = () => {
		setRecipes(defaultRecipes);
	};

	return {
		recipes,
		addRecipe,
		updateRecipe,
		deleteRecipe,
		importRecipes,
		duplicateRecipe,
		resetRecipes,
	};
}
