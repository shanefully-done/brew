"use client";

import React from "react";
import Link from "next/link";
import { useRecipes } from "@/hooks/use-recipes";
import { Recipe } from "@/lib/types";
import { RecipeCard } from "@/components/recipe-card";
import { ConfigButton } from "@/components/config-button";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ImportExport } from "@/components/import-export";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GroupedRecipes {
	[brewer: string]: Recipe[];
}

export function RecipeList() {
	const { recipes, duplicateRecipe, deleteRecipe, resetRecipes } = useRecipes();

	const groupedRecipes = recipes.reduce((acc: GroupedRecipes, recipe) => {
		if (recipe.brewer) {
			if (!acc[recipe.brewer]) {
				acc[recipe.brewer] = [];
			}
			acc[recipe.brewer].push(recipe);
		}
		return acc;
	}, {});

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="flex flex-wrap justify-end gap-2">
				<Link href="/recipe/new">
					<Button>New Recipe</Button>
				</Link>
				<ConfigButton />
			</div>
			{Object.keys(groupedRecipes).length === 0 ? (
				<p>No recipes found. Add some recipes to get started!</p>
			) : (
				<Accordion type="single" collapsible className="w-full">
					{Object.entries(groupedRecipes).map(([brewer, recipes]) => (
						<AccordionItem key={brewer} value={brewer}>
							<AccordionTrigger className="text-lg font-semibold">
								{brewer} ({recipes.length})
							</AccordionTrigger>
							<AccordionContent>
								<div className="grid grid-cols-1 gap-4 p-4">
									{recipes.map((recipe) => (
										<RecipeCard
											key={recipe.id}
											recipe={recipe}
											onDuplicate={duplicateRecipe}
											onDelete={deleteRecipe}
										/>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}
			<div className="flex flex-wrap justify-end mt-4 gap-2">
				<ImportExport />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Reset App</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete all your
								custom recipes and restore the application to its default state.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={resetRecipes}>Reset</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
