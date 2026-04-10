export const siteConfig = {
  name: 'Esa Sjana',
  description:
    'Personal portfolio, blog, and project showcase of Esa Sjana — software engineer and creative technologist.',
  url: 'https://esasjana.com',
  ogImage: '/og/default.png',
  links: {
    github: 'https://github.com/cakahlul',
  },
  author: {
    name: 'Esa Sjana',
    email: '',
  },
} as const

export type SiteConfig = typeof siteConfig
