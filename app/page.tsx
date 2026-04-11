import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ArrowRight, FolderKanban, Briefcase, Pen, Mail } from 'lucide-react'

const sections = [
  {
    title: 'Projects',
    description: 'Things I have built',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    title: 'Experience',
    description: 'Where I have worked',
    href: '/experience',
    icon: Briefcase,
  },
  {
    title: 'Blog',
    description: 'What I write about',
    href: '/blog',
    icon: Pen,
  },
  {
    title: 'Contact',
    description: 'Get in touch',
    href: '/contact',
    icon: Mail,
  },
]

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Esa Sjana
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground">
            Software engineer &amp; creative technologist. Building things that
            matter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="group cursor-pointer transition-colors hover:border-primary/50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="text-left text-lg">
                  {section.title}
                </CardTitle>
                <CardDescription className="text-left">
                  {section.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/cakahlul"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
