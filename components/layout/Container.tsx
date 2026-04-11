import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer'
}

export function Container({
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-5xl px-4 sm:px-6', className)}
      {...props}
    />
  )
}
