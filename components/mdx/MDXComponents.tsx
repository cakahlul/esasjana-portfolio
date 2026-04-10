import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href
  if (href?.startsWith('/')) {
    return <Link href={href} {...props} />
  }
  if (href?.startsWith('#')) {
    return <a {...props} />
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function CustomImage({
  alt,
  ...props
}: React.ComponentProps<typeof Image> & { alt: string }) {
  return (
    <Image
      alt={alt}
      className="rounded-lg"
      sizes="(max-width: 768px) 100vw, 700px"
      {...props}
    />
  )
}

function Callout({
  children,
  type = 'info',
}: {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'error'
}) {
  const styles = {
    info: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950/30',
    warning: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/30',
    error: 'border-red-500/50 bg-red-50 dark:bg-red-950/30',
  }

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  a: CustomLink as unknown as React.ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >,
  Image: CustomImage,
  Callout,
}
