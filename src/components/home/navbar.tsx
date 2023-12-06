import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BiMenuAltRight, BiX } from 'react-icons/bi'
import { backdrop, drawer, menu } from '@/utils/motion'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const path = router.asPath === '/' ? '#home' : router.asPath.substring(1)
    const routes = [
        { path: '#home', title: 'Home' },
        { path: '#about', title: 'About' },
        { path: '#services', title: 'Services' },
        { path: '#work', title: 'Work' },
        { path: '#contact', title: 'Contact' },
        { path: '/blog', title: 'Blog' }
    ]

    return (
        <nav className='w-full fixed bg-slate-950 shadow-xl px-8 py-4 z-10'>
            <div className='flex items-center justify-between'>
                <p className='font-bold text-2xl'>Portfolio<span className='text-sky-500'>.</span></p>
                <motion.div
                    className='w-12 h-12 right-8 absolute bg-slate-800 rounded-full z-10'
                    animate={open ? 'visible' : 'hidden'}
                    variants={backdrop()}
                />
                <motion.div
                    className='w-screen h-screen top-0 left-0 absolute flex flex-col items-center justify-center gap-y-4 z-10'
                    initial={false}
                    animate={open ? 'visible' : 'hidden'}
                    variants={drawer()}
                >
                    {routes.map(route => (
                        <motion.div
                            key={route.title}
                            variants={menu()}
                        >
                            <Link
                                className={`${path === route.path && 'text-sky-500'} font-bold text-3xl hover:text-sky-500`}
                                href={route.path}
                                onClick={() => setOpen(false)}
                            >
                                {route.title}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                <button
                    className='text-sky-500 z-10 mr-2'
                    onClick={() => setOpen(!open)}
                >
                    {open ? <BiX size='36' /> : <BiMenuAltRight size='36' />}
                </button>
            </div>
        </nav>
    )
}
