import Footer from '@/components/blog/footer'
import Navbar from '@/components/blog/navbar'
import Newsletter from '@/components/blog/newsletter'
import PostItem from '@/components/blog/post-item'
import { supabase } from '@/services/supabase'

interface BlogProps {
    posts: PostData[]
}

export default function Blog({ posts }: BlogProps) {
    return (
        <>
            <Navbar />
            <main>
                <div className='p-4'>
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

export async function getServerSideProps() {
    const { data } = await supabase.from('posts').select().eq('published', true)
    return { props: { posts: data } }
}
