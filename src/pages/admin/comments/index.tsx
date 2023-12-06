import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import CommentItem from '@/components/admin/comment-item'

export default function Comments() {
    const [comments, setComments] = useState<CommentData[]>([])
    const router = useRouter()

    useEffect(() => {
        async function getComments() {
            const { data } = await supabase.from('comments').select('*, users(*)').order('created_at', { ascending: false })
            setComments(data ?? [])
        }
        getComments()
    }, [])

    return (
        <main className='m-8'>
            <Breadcrumbs />
            <p className='mt-8'>{comments.length} Comments</p>
            <div className='rounded-lg mt-4 overflow-hidden'>
                {comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onClick={() => router.push('/admin/comments/detail?id=' + comment.id)}
                    />
                ))}
            </div>
        </main>
    )
}
