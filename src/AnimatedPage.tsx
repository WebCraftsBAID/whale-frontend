import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

export default function AnimatedPage({ children }: { children: ReactNode }): JSX.Element {
    return (
        <motion.main
            className='main-animation'
            initial={{
                y: '-3%',
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            exit={{
                y: '3%',
                opacity: 0
            }}
            transition={{ duration: 0.2 }}>
            {children}
        </motion.main>
    )
}
