import { z } from 'zod'

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date string',
  }),
  updated: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)))
    .optional(),
  tags: z.array(z.string()).min(1),
  cover: z.string().optional(),
  draft: z.boolean().optional().default(false),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>

export interface Post extends PostFrontmatter {
  slug: string
  readingTime: string
  content: string
}

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  href?: string
  github?: string
  cover?: string
  year: number
  featured: boolean
}

export interface Experience {
  company: string
  role: string
  startDate: string
  endDate: string | 'Present'
  description: string
  tags: string[]
  href?: string
}
