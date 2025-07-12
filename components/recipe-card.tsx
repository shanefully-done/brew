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
import { useLocale } from "@/hooks/use-locale";

interface RecipeCardProps {
	recipe: Recipe;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, onDuplicate, onDelete }: RecipeCardProps) {
	const { dict } = useLocale();

	return (
		<Card className="w-full max-w-sm">
			<Link href={`/recipe/${recipe.id}`}>
				<CardHeader>
					<CardTitle>{recipe.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						{dict?.card?.brewer || "Brewer"}: {recipe.brewer}
					</p>
					<p>
						{dict?.card?.dose || "Dose"}: {recipe.dose}g
					</p>
					<p>
						{dict?.card?.water || "Water"}: {recipe.water}g
					</p>
					<p>
						{dict?.card?.totalTime || "Total Time"}:{" "}
						{(() => {
							const totalSeconds =
								(recipe.stages?.reduce(
									(sum, stage) => sum + (Number(stage.duration) || 0),
									0
								) || 0) + Number(recipe.drainTime || 0);

							const minutes = Math.floor(totalSeconds / 60);
							const seconds = (totalSeconds % 60).toString().padStart(2, "0");

							return `${minutes}:${seconds}`;
						})()}
					</p>
				</CardContent>
			</Link>
			<CardFooter className="flex justify-end space-x-2">
				<Button variant="outline" onClick={() => onDuplicate(recipe.id)}>
					{dict?.buttons?.dupe || "Duplicate"}
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">{dict?.buttons?.remove || "Remove"}</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{dict?.cardRemove?.title || "Are you absolutely sure?"}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{dict?.cardRemove?.desc ||
									"This action cannot be undone. This will permanently delete your recipe."}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								{dict?.buttons?.cancel || "Cancel"}
							</AlertDialogCancel>
							<AlertDialogAction onClick={() => onDelete(recipe.id)}>
								{dict?.buttons?.remove || "Delete"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
