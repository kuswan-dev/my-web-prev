import About from '@/components/home/about'
import Contact from '@/components/home/contact'
import Headline from '@/components/home/headline'
import Navbar from '@/components/home/navbar'
import Services from '@/components/home/services'
import Work from '@/components/home/work'

export default function Home() {
    return (
        <div className='text-white bg-slate-950'>
            <Navbar />
            <main>
                <Headline />
                <About />
                <Services />
                <Work />
                <Contact />
            </main>
        </div>
    )
}
