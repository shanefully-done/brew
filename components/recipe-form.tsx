"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

import { Recipe } from "@/lib/types";
import { useRecipes } from "@/hooks/use-recipes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/hooks/use-locale";

const recipeFormSchema = z.object({
	id: z.string(), // Made id required to help with type inference
	name: z.string().optional(),
	brewer: z.string().optional(),
	dose: z.coerce.number().optional(),
	water: z.coerce.number().optional(),
	ratio: z.string().optional(),
	temperature: z.coerce.number().optional(),
	grindSize: z.string().optional(),
	drainTime: z.coerce.number().optional(),
	stages: z
		.array(
			z.object({
				id: z.string().optional(),
				name: z.string().optional(),
				water: z.coerce.number().optional(),
				duration: z.coerce.number().optional(),
				instructions: z.string().optional(),
			})
		)
		.optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface RecipeFormProps {
	initialRecipe?: Recipe;
}

export function RecipeForm({ initialRecipe }: RecipeFormProps) {
	const { dict } = useLocale();
	const router = useRouter();
	const { addRecipe, updateRecipe } = useRecipes();

	const form = useForm<RecipeFormValues>({
		resolver: zodResolver(recipeFormSchema) as Resolver<RecipeFormValues>, // Explicitly cast resolver type
		defaultValues: initialRecipe
			? {
					...initialRecipe,
					id: initialRecipe.id, // Ensure id is explicitly set for existing recipes
					stages:
						initialRecipe.stages?.map((stage) => ({
							...stage,
							id: stage.id || uuidv4(), // Ensure stages have IDs for react-hook-form
						})) || [],
			  }
			: {
					id: uuidv4(), // Generate a new ID for new recipes
					name: "",
					brewer: "",
					dose: undefined,
					water: undefined,
					ratio: "",
					temperature: undefined,
					grindSize: "",
					drainTime: undefined,
					stages: [],
			  },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "stages",
	});

	useEffect(() => {
		if (initialRecipe) {
			form.reset({
				...initialRecipe,
				stages:
					initialRecipe.stages?.map((stage) => ({
						...stage,
						id: stage.id || uuidv4(),
					})) || [],
			});
		}
	}, [initialRecipe, form]);

	const onSubmit = (values: RecipeFormValues) => {
		if (initialRecipe) {
			updateRecipe(initialRecipe.id, values as Recipe);
		} else {
			addRecipe(values as Recipe);
		}
		router.push("/"); // Navigate back to recipe list
		// playSound(); // This would play the sound on form submission
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>
					{initialRecipe
						? dict?.recipe?.titleEdit || "Edit Recipe"
						: dict?.recipe?.titleNew || "Create New Recipe"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dict?.recipe?.name || "Recipe Name"}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="brewer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dict?.recipe?.brewer || "Brewer"}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="dose"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{dict?.recipe?.dosage || "Dose (g)"}</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="water"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{dict?.recipe?.water || "Water (ml)"}</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="ratio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{dict?.recipe?.ratio || "Ratio (e.g., 1:16.6)"}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="temperature"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{dict?.recipe?.temp || "Temperature (°C)"}</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="grindSize"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{dict?.recipe?.grind || "Grind Size"}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="drainTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dict?.recipe?.drain || "Drain Time (s)"}</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Separator />

						<h3 className="text-lg font-semibold mb-4">
							{dict?.recipe?.stage?.title || "Stages"}
						</h3>
						<div className="space-y-4">
							{fields.map((field, index) => (
								<Card key={field.id} className="p-4">
									<div className="flex justify-between items-center mb-4">
										<h4 className="font-medium">
											{dict?.recipe?.stage?.name
												? `${index + 1} ${dict.recipe.stage.name}`
												: `Stage ${index + 1}`}
										</h4>
										<Button
											type="button"
											variant="destructive"
											size="sm"
											onClick={() => remove(index)}
										>
											{dict.recipe.stage.remove}
										</Button>
									</div>
									<FormField
										control={form.control}
										name={`stages.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{dict.recipe.stage.name}</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-4 mt-4">
										<FormField
											control={form.control}
											name={`stages.${index}.water`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>{dict.recipe.water}</FormLabel>
													<FormControl>
														<Input type="number" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`stages.${index}.duration`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>{dict.recipe.stage.duration}</FormLabel>
													<FormControl>
														<Input type="number" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name={`stages.${index}.instructions`}
										render={({ field }) => (
											<FormItem className="mt-4">
												<FormLabel>{dict.recipe.stage.instruction}</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</Card>
							))}
						</div>
						<Button
							type="button"
							onClick={() =>
								append({
									id: uuidv4(),
									name: "",
									water: 0,
									duration: 0,
									instructions: "",
								})
							}
							variant="outline"
							className="w-full"
						>
							{dict.recipe.stage.add}
						</Button>

						<Button type="submit" className="w-full">
							{dict.recipe.create}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
