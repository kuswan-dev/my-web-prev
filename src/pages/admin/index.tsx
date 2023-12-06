import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiComment, BiFile, BiMessage } from 'react-icons/bi'
import { supabase } from '@/services/supabase'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import CardItem from '@/components/admin/card-item'

export default function Admin() {
    const [posts, setPosts] = useState(0)
    const [comments, setComments] = useState(0)
    const router = useRouter()

    useEffect(() => {
        async function getData() {
            const { data: postsData } = await supabase.from('posts').select()
            const { data: commentsData } = await supabase.from('comments').select()
            const { data: repliesData } = await supabase.from('replies_comment').select()
            setPosts(postsData?.length ?? 0)
            setComments((commentsData?.length ?? 0) + (repliesData?.length ?? 0))
        }
        getData()
    }, [])

    return (
        <main className='m-8'>
            <Breadcrumbs />
            <div className='flex gap-8 mt-8'>
                <CardItem
                    count={posts}
                    icon={<BiFile />}
                    title='Posts'
                    onClick={() => router.push('/admin/posts')}
                />
                <CardItem
                    count={comments}
                    icon={<BiComment />}
                    title='Comments'
                    onClick={() => router.push('/admin/comments')}
                />
                <CardItem
                    count={24}
                    icon={<BiMessage />}
                    title='Message'
                    onClick={() => { }}
                />
            </div>
        </main>
    )
}
