import { RecipeDetailWithSound } from "@/components/recipe-detail-with-sound";

interface RecipePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function RecipePage({ params }: RecipePageProps) {
	const resolvedParams = await params;
	return (
		<div className="container mx-auto p-4">
			<RecipeDetailWithSound id={resolvedParams.id} />
		</div>
	);
}
