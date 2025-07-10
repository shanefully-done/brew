import { RecipeList } from "@/components/recipe-list";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<RecipeList />
		</main>
	);
}
