import { ReactNode } from 'react'

export function CustomHeading({
  children,
}: {
  children: ReactNode,
}) {
  return (
    <div className="custom-heading">{children}</div>
  )
}
