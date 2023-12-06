import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import Button from '../common/button'
import { supabase } from '@/services/supabase'

interface CommentFormProps {
    postId: string,
    onUpdate: () => void
}

export default function CommentForm({ postId, onUpdate }: CommentFormProps) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const session = useSession()

    async function addComment() {
        setLoading(true)
        const data = {
            content,
            post_id: postId,
            user_id: session?.user.id
        }
        await supabase.from('comments').insert(data)
        onUpdate()
        setContent('')
        setLoading(false)
    }

    return (
        <div className='bg-white shadow-md rounded-lg p-8 m-8'>
            <p className='font-bold text-xl'>Add Your Comment</p>
            <textarea
                className='w-full h-28 bg-slate-200 rounded-lg outline-none p-4 mt-6 mb-4'
                placeholder='Write something ...'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <Button
                loading={loading}
                disabled={content === ''}
                onClick={addComment}
            >
                Post Comment
            </Button>
        </div>
    )
}
