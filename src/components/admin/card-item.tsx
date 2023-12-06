import { ReactNode } from 'react'

interface CardItemProps {
    count: number,
    icon: ReactNode,
    title: string,
    onClick: () => void
}

export default function CardItem({ count, icon, title, onClick }: CardItemProps) {
    return (
        <div
            className='w-40 text-center bg-white shadow-md rounded-lg p-4 cursor-pointer'
            onClick={onClick}
        >
            <span className='text-slate-300 text-4xl'>{icon}</span>
            <p className='font-bold text-2xl'>{count}</p>
            <p>{title}</p>
        </div>
    )
}
