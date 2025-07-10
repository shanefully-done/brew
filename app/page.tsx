import { RecipeList } from "@/components/recipe-list";

export default function Home() {
	return (
		<main className="flex flex-col items-center">
			<RecipeList />
		</main>
	);
}
