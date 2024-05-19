import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

export default function AnimatedPage({ children }: { children: ReactNode }): JSX.Element {
    return (
        <motion.main
            className='main-animation'>
            {children}
        </motion.main>
    )
}
