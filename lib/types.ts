export interface Recipe {
	id: string;
	name?: string;
	brewer?: string;
	dose?: number;
	water?: number;
	ratio?: string;
	temperature?: number;
	grindSize?: string;
	drainTime?: number;
	stages?: Array<{
		id?: string;
		name?: string;
		water?: number;
		duration?: number;
		instructions?: string;
	}>;
}
