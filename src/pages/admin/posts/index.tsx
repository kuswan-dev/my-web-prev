import Link from 'next/link'
import Breadcrumbs from '@/components/admin/breadcrumbs'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { supabase } from '@/services/supabase'
import PostItem from '@/components/admin/post-item'

export default function Posts() {
    const [posts, setPosts] = useState<PostData[]>([])

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const { data } = await supabase.from('posts').select().order('created_at', { ascending: false })
        setPosts(data as PostData[])
    }

    return (
        <main className='m-8'>
            <Breadcrumbs />
            <Link
                className='inline-flex items-center gap-x-2 text-white text-sm bg-slate-800 rounded-lg px-4 py-2.5 mt-8'
                href='/admin/posts/create-post'
            >
                <BiPlus />
                Create Post
            </Link>
            <div className='flex flex-col gap-y-4 mt-8'>
                {posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onUpdate={getPosts}
                    />
                ))}
            </div>
        </main>
    )
}
