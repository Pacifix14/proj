import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const getBudgets = protectedProcedure
	.input(
		z.object({
			name: z.string().optional(),
			page: z.number().int().positive().default(1),
			perPage: z.number().int().positive().min(1).max(100).default(6),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { name, page, perPage } = input;
		const searchLower = name?.toLowerCase();
		const skip = (page - 1) * perPage;
		const take = perPage;

		// Build the where condition dynamically based on the input
		const whereConditions = {
			AND: [...(name ? [{ name: { contains: searchLower } }] : [])],
			active: true,
		};

		// Query the budgets from the database
		const budgets = await ctx.db.budget.findMany({
			where: whereConditions,
			orderBy: { name: "desc" },
			include: {
				createdBy: true,
				project: true,
				_count: {
					select: {
						budgetItems: true, // Example count of budget items, adjust as needed
					},
				},
			},
			skip,
			take,
		});

		// Count the total number of budgets matching the condition
		const totalCount = await ctx.db.budget.count({
			where: whereConditions,
		});

		const pageCount = Math.ceil(totalCount / perPage);

		// Convert Decimal fields to numbers for JSON serialization
		const budgetsWithPlainData = budgets.map((budget) => ({
			...budget,
			budget: budget.budget.toNumber(), // Convert Decimal to number
			createdAt: budget.createdAt.toString(), // Optionally convert Date to string
			updatedAt: budget.updatedAt.toString(), // Optionally convert Date to string
		}));

		return {
			budgets: budgetsWithPlainData,
			totalCount,
			pageCount,
		};
	});

export default getBudgets;
