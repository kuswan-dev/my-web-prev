import { useState } from 'react'

interface PostTagProps {
    value: string[],
    onChange: (newValue: string[]) => void
}

export default function PostTag({ value, onChange }: PostTagProps) {
    const [tag, setTag] = useState('')

    return (
        <div className='flex flex-wrap items-center gap-3 mt-8'>
            <input
                className='w-40 border border-slate-400 bg-slate-200 rounded-lg outline-none px-4 py-2'
                placeholder='#tags'
                value={tag}
                onChange={e => setTag(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        onChange([...value, tag])
                        setTag('')
                    }
                }}
            />
            {value.map((tag, index) => (
                <div
                    key={index}
                    className='flex items-center gap-x-2 bg-white shadow-md rounded-lg px-4 py-2'
                >
                    <p className='text-slate-500'>#{tag}</p>
                    <button
                        className='-mt-4 -mr-2'
                        onClick={() => {
                            const newTags = value.filter(item => item !== tag)
                            onChange(newTags)
                        }}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    )
}
