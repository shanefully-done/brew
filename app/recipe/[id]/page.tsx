import { RecipeDetailView } from "@/components/recipe-detail-view";

export default function RecipePage({ params }: { params: { id: string } }) {
	return (
		<div className="container mx-auto p-4">
			<RecipeDetailView id={params.id} />
		</div>
	);
}
