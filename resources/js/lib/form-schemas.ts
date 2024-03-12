import { z } from "zod";

export const depreciationFormSchema = z.object({
    name: z.string({required_error: 'Depreciation name is required'}),
    months: z.number({required_error: 'Depreciation month is required'}),
})