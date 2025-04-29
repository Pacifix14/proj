import type {
	Approval,
	Attachment,
	Budget,
	BudgetCategory,
	BudgetDiscount,
	BudgetItem,
	Company,
	ContactPerson,
	Project,
	User,
} from "@prisma/client";

declare global {
	namespace PrismaJson {
		type BudgetVersionSnapshot = Budget & {
			createdBy: User;
			project: Project & {
				contactPerson: ContactPerson;
				company: Company;
			};
			budgetCategory: BudgetCategory;
			budgetItems: Array<BudgetItem>;
			approvals: Array<Approval & { approver: User; requester: User }>;
			discount: BudgetDiscount | null;
			attachments: Array<Attachment>;
		};
	}
}
