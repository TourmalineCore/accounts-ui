import { ReactNode } from 'react'

export function DefaultCardHeader({
  children,
}: {
  children: ReactNode,
}) {
  return (
    <div className="default-card-header">{children}</div>
  )
}
