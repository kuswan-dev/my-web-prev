import { ReactNode } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface ButtonProps {
    children: ReactNode,
    variant?: 'primary' | 'outline',
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void
}

export default function Button({ children, variant = 'primary', loading, disabled, onClick }: ButtonProps) {
    return (
        <button
            className={`
                ${variant === 'primary' && 'text-white bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed'}
                ${variant === 'outline' && 'border border-slate-800 hover:bg-slate-200'}
                flex items-center gap-x-2 font-bold text-sm rounded-lg px-4 py-2.5
            `}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
            {loading && <BiLoaderAlt className='animate-spin' />}
        </button>
    )
}
