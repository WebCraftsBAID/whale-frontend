import { type ReactNode } from 'react'

export default function ComponentIconText({
    icon,
    children
}: { icon: ReactNode, children: ReactNode }): JSX.Element {
    return (
        <div className='rounded-2xl bg-accent-yellow-bg flex py-3 px-4 items-center'>
            <div className='text-xl mr-3'>
                {icon}
            </div>
            <p className='text-xs lg:text-sm'>{children}</p>
        </div>
    )
}
