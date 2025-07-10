import { RecipeDetailView } from "@/components/recipe-detail-view";

interface RecipePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function RecipePage({ params }: RecipePageProps) {
	const resolvedParams = await params;
	return (
		<div className="container mx-auto p-4">
			<RecipeDetailView id={resolvedParams.id} />
		</div>
	);
}
