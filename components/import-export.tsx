"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecipes } from "@/hooks/use-recipes";
import { Recipe } from "@/lib/types";
import { useLocale } from "@/hooks/use-locale";

export function ImportExport() {
	const { dict } = useLocale();
	const { recipes, importRecipes } = useRecipes();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleExport = () => {
		const json = JSON.stringify(recipes, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "recipes.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const content = e.target?.result as string;
					const importedData: Recipe[] = JSON.parse(content);
					importRecipes(importedData);
					alert("Recipes imported successfully!");
				} catch (error) {
					alert("Failed to import recipes: Invalid JSON file.");
					console.error("Error importing recipes:", error);
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className="flex space-x-2">
			<Button onClick={handleExport}>
				{dict?.buttons?.export || "Export Recipes"}
			</Button>
			<Input
				type="file"
				accept=".json"
				ref={fileInputRef}
				onChange={handleImport}
				className="hidden"
			/>
			<Button onClick={() => fileInputRef.current?.click()}>
				{dict?.buttons?.import || "Import Recipes"}
			</Button>
		</div>
	);
}
