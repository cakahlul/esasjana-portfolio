import Link from 'next/link'
import { Github, Rss } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/lib/data/site'

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.author.name}. Built with
          Next.js.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <Link
            href="/blog/rss.xml"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            aria-label="RSS feed"
          >
            <Rss className="h-4 w-4" />
            RSS
          </Link>
        </div>
      </Container>
    </footer>
  )
}
