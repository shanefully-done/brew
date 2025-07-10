import Link from "next/link";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Recipe } from "@/lib/types";

interface RecipeCardProps {
	recipe: Recipe;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, onDuplicate, onDelete }: RecipeCardProps) {
	return (
		<Card className="w-full max-w-sm">
			<Link href={`/recipe/${recipe.id}`}>
				<CardHeader>
					<CardTitle>{recipe.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Brewer: {recipe.brewer}</p>
					<p>Dose: {recipe.dose}g</p>
					<p>Water: {recipe.water}g</p>
					<p>Ratio: {recipe.ratio}</p>
				</CardContent>
			</Link>
			<CardFooter className="flex justify-end space-x-2">
				<Button variant="outline" onClick={() => onDuplicate(recipe.id)}>
					Duplicate
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Remove</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your recipe.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => onDelete(recipe.id)}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
