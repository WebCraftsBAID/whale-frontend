import { type ReactNode } from 'react'

export default function AnimatedPage({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div>
            {children}
        </div>
    )
}
