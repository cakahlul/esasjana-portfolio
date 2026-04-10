import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/data/site'
import { Button } from '@/components/ui/button'
import { Mail, Github } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with me.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main className="container mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground">
          Have a project in mind, want to collaborate, or just want to say hi?
          Feel free to reach out.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {siteConfig.author.email && (
          <Button asChild>
            <a href={`mailto:${siteConfig.author.email}`}>
              <Mail className="h-4 w-4" />
              Send Email
            </a>
          </Button>
        )}
        <Button variant="outline" asChild>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </Button>
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        A full contact form is coming soon.
      </p>
    </main>
  )
}
