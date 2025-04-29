import type {
  Approval,
  Attachment,
  BudgetItem,
  BudgetDiscount,
  User,
  Project,
  BudgetCategory,
  Budget,
  ContactPerson,
  Company,
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
