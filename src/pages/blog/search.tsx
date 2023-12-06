import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Navbar from '@/components/blog/navbar'
import { supabase } from '@/services/supabase'
import PostItem from '@/components/blog/post-item'
import Newsletter from '@/components/blog/newsletter'
import Footer from '@/components/blog/footer'

export default function Search() {
    const [query, setQuery] = useState('')
    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setQuery(router.query.q as string ?? '')
    }, [router.query.q])

    async function handleSearch() {
        setLoading(true)
        router.replace('/blog/search', { query: { q: query } })
        const { data } = await supabase.from('posts').select().textSearch('content', `'${query}'`)
        setPosts(data as PostData[])
        setLoading(false)
    }

    return (
        <>
            <Navbar />
            <main className='flex flex-col items-center'>
                <div className='flex gap-x-4 bg-white shadow-md rounded-xl px-6 py-4 m-8'>
                    <input
                        className='w-96 outline-none'
                        placeholder='Type something ...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <BiSearch size='24' />
                    </button>
                </div>
                {loading && <p>Searching..</p>}
                <div>
                    {posts.map(post => (
                        <PostItem
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            </main>
            <Newsletter />
            <Footer />
        </>
    )
}
