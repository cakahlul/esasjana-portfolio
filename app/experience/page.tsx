import { experiences } from '@/lib/data/experience'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export const metadata = buildMetadata({
  title: 'Experience',
  description: 'My professional experience and career journey.',
  path: '/experience',
})

function formatPeriod(start: string, end: string | 'Present') {
  const startDate = new Date(start + '-01')
  const startStr = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(startDate)

  if (end === 'Present') return `${startStr} — Present`

  const endDate = new Date(end + '-01')
  const endStr = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(endDate)

  return `${startStr} — ${endStr}`
}

export default function ExperiencePage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground">My professional journey so far.</p>
      </div>

      <div className="relative mt-10">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 h-full w-px bg-border md:left-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={`${exp.company}-${exp.startDate}`} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full bg-primary md:left-1/2 md:-translate-x-1" />

              <div
                className={`pl-6 md:w-1/2 ${
                  index % 2 === 0
                    ? 'md:pr-10 md:pl-0'
                    : 'md:ml-auto md:pl-10'
                }`}
              >
                <div className="rounded-lg border bg-card p-5">
                  <p className="text-xs text-muted-foreground">
                    {formatPeriod(exp.startDate, exp.endDate)}
                  </p>
                  <h3 className="mt-1 font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.href ? (
                      <a
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </p>
                  <p className="mt-2 text-sm">{exp.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
