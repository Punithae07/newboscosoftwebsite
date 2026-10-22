import { z } from "zod";
import { apiRequest } from "@/lib/api";
import { buildSecureFormPayload } from "@/lib/public-form-security";

export const contactStatuses = [
  "New",
  "Contacted",
  "In Progress",
  "Converted",
  "Closed",
] as const;

export const contactSortOptions = [
  { value: "created_at_desc", label: "Newest first" },
  { value: "created_at_asc", label: "Oldest first" },
  { value: "name_asc", label: "Name A-Z" },
  { value: "name_desc", label: "Name Z-A" },
  { value: "email_asc", label: "Email A-Z" },
  { value: "email_desc", label: "Email Z-A" },
  { value: "status_asc", label: "Status A-Z" },
  { value: "status_desc", label: "Status Z-A" },
] as const;

export const createdDateSortOptions = [
  { value: "created_at_desc", label: "Newest first" },
  { value: "created_at_asc", label: "Oldest first" },
] as const;

export type ContactStatus = (typeof contactStatuses)[number];
export type ContactSortValue = (typeof contactSortOptions)[number]["value"];
export type CreatedDateSortValue = (typeof createdDateSortOptions)[number]["value"];

export type ContactRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  industry: string | null;
  product_interest: string | null;
  message: string;
  source_page: string | null;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
};

export type NewsletterRecord = {
  id: number;
  email: string;
  is_subscribed: boolean;
  verify_status: boolean;
  subscribed_on: string | null;
  created_at: string;
  updated_at: string;
};

export type BrochureRecord = {
  id: number;
  name: string;
  pdf_name: string | null;
  organization_name: string;
  organization_email: string;
  contact_number: string;
  created_at: string;
  updated_at: string;
};

export type AdminUserRecord = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export const adminContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().optional().or(z.literal("")),
  product_interest: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required"),
  source_page: z.string().trim().optional().or(z.literal("")),
  status: z.enum(contactStatuses),
});

export type AdminContactFormValues = z.infer<typeof adminContactSchema>;

export const publicContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().optional().or(z.literal("")),
  product_interest: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required"),
  botcheck: z.string().trim().optional().or(z.literal("")),
});

const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  botcheck: z.string().trim().optional().or(z.literal("")),
});

export type PublicContactFormValues = z.infer<typeof publicContactSchema>;

export type DeliveryResponse = {
  success: boolean;
  message: string;
  mail_sent: boolean;
  admin_mail_sent: boolean;
  web3forms_sent: boolean;
};

export type ContactsQuery = {
  page: number;
  pageSize?: number;
  search?: string;
  status?: ContactStatus | "All";
  sort?: ContactSortValue;
};

export type BasicAdminListQuery = {
  page: number;
  pageSize?: number;
  search?: string;
  sort?: CreatedDateSortValue;
};

export type ContactListResult = {
  records: ContactRecord[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type NewsletterListResult = {
  records: NewsletterRecord[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type BrochureListResult = {
  records: BrochureRecord[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type AdminUserListResult = {
  records: AdminUserRecord[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function normalizeOptional(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function sanitizeSearchTerm(term: string) {
  return term.replace(/[%(),]/g, " ").trim();
}

function getValidationMessage(error: z.ZodError) {
  return error.issues[0]?.message || "Please check your input and try again.";
}

function mapContactPayload(values: AdminContactFormValues) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: normalizeOptional(values.phone),
    company: normalizeOptional(values.company),
    country: normalizeOptional(values.country),
    industry: normalizeOptional(values.industry),
    product_interest: normalizeOptional(values.product_interest),
    message: values.message.trim(),
    source_page: normalizeOptional(values.source_page),
    status: values.status,
  };
}

function buildBasicListParams({
  page,
  pageSize = 10,
  search,
  sort = "created_at_desc",
}: BasicAdminListQuery) {
  const cleanSearch = sanitizeSearchTerm(search ?? "");
  const { sortDirection } = splitCreatedDateSort(sort);
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sortDirection,
  });

  if (cleanSearch) {
    params.set("search", cleanSearch);
  }

  return params;
}

function splitContactSort(sort: ContactSortValue) {
  const lastUnderscoreIndex = sort.lastIndexOf("_");
  const sortBy = sort.slice(0, lastUnderscoreIndex);
  const sortDirection = sort.slice(lastUnderscoreIndex + 1) as "asc" | "desc";

  return { sortBy, sortDirection };
}

function splitCreatedDateSort(sort: CreatedDateSortValue) {
  const sortDirection = sort.endsWith("_asc") ? "asc" : "desc";

  return { sortDirection };
}

export async function createContact(values: AdminContactFormValues) {
  const payload = mapContactPayload(adminContactSchema.parse(values));
  return apiRequest<ContactRecord>("/admin/contacts", {
    method: "POST",
    body: payload,
  });
}

export async function submitPublicContact(values: PublicContactFormValues, sourcePage: string): Promise<DeliveryResponse> {
  const result = publicContactSchema.safeParse(values);

  if (!result.success) {
    throw new Error(getValidationMessage(result.error));
  }

  const parsed = result.data;

  if (parsed.botcheck) {
    throw new Error("Sorry, something went wrong. Please try again.");
  }

  const payload = await buildSecureFormPayload("contact", {
    name: parsed.name.trim(),
    email: parsed.email.trim(),
    phone: parsed.phone?.trim() ?? "",
    company: parsed.company?.trim() ?? "",
    country: parsed.country?.trim() ?? "",
    industry: parsed.industry?.trim() ?? "",
    product_interest: parsed.product_interest?.trim() ?? "",
    message: parsed.message.trim(),
    source_page: sourcePage,
    botcheck: parsed.botcheck?.trim() ?? "",
  });

  return apiRequest<DeliveryResponse>("/contact", {
    method: "POST",
    body: payload,
  });
}

export async function submitNewsletterSubscription(values: {
  email: string;
  botcheck?: string;
}) {
  const result = newsletterSubscriptionSchema.safeParse(values);

  if (!result.success) {
    throw new Error(getValidationMessage(result.error));
  }

  const parsed = result.data;

  if (parsed.botcheck) {
    throw new Error("Sorry, something went wrong. Please try again.");
  }

  const payload = await buildSecureFormPayload("newsletter", {
    email: parsed.email.trim(),
    botcheck: parsed.botcheck?.trim() ?? "",
  });

  return apiRequest<DeliveryResponse>("/newsletter-subscribe", {
    method: "POST",
    body: payload,
  });
}

export async function updateContact(id: string, values: AdminContactFormValues) {
  const payload = mapContactPayload(adminContactSchema.parse(values));

  return apiRequest<ContactRecord>(`/admin/contacts/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteContact(id: string) {
  await apiRequest<{ message: string }>(`/admin/contacts/${id}`, {
    method: "DELETE",
  });
}

export async function deleteNewsletter(id: number) {
  await apiRequest<{ message: string }>(`/admin/newsletters/${id}`, {
    method: "DELETE",
  });
}

export async function deleteBrochure(id: number) {
  await apiRequest<{ message: string }>(`/admin/brochures/${id}`, {
    method: "DELETE",
  });
}

export async function getContactById(id: string) {
  return apiRequest<ContactRecord>(`/admin/contacts/${id}`, {
    method: "GET",
  });
}

export async function getBrochureById(id: number) {
  return apiRequest<BrochureRecord>(`/admin/brochures/${id}`, {
    method: "GET",
  });
}

export async function listContacts({
  page,
  pageSize = 10,
  search,
  status = "All",
  sort = "created_at_desc",
}: ContactsQuery): Promise<ContactListResult> {
  const cleanSearch = sanitizeSearchTerm(search ?? "");
  const { sortBy, sortDirection } = splitContactSort(sort);

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    status,
    sortBy,
    sortDirection,
  });

  if (cleanSearch) {
    params.set("search", cleanSearch);
  }

  return apiRequest<ContactListResult>(`/admin/contacts?${params.toString()}`, {
    method: "GET",
  });
}

export async function listNewsletters(query: BasicAdminListQuery): Promise<NewsletterListResult> {
  const params = buildBasicListParams(query);

  return apiRequest<NewsletterListResult>(`/admin/newsletters?${params.toString()}`, {
    method: "GET",
  });
}

export async function listBrochures(query: BasicAdminListQuery): Promise<BrochureListResult> {
  const params = buildBasicListParams(query);

  return apiRequest<BrochureListResult>(`/admin/brochures?${params.toString()}`, {
    method: "GET",
  });
}

export async function listAdminUsers(query: BasicAdminListQuery): Promise<AdminUserListResult> {
  const params = buildBasicListParams(query);

  return apiRequest<AdminUserListResult>(`/admin/users?${params.toString()}`, {
    method: "GET",
  });
}

export async function getDashboardStats() {
  return apiRequest<{
    totalContacts: number;
    newContacts: number;
    contactedContacts: number;
    convertedContacts: number;
    totalNewsletters: number;
    totalBrochures: number;
    latestContacts: ContactRecord[];
  }>("/admin/dashboard", {
    method: "GET",
  });
}
