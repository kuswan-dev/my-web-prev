import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'

export default function About() {
    return (
        <motion.div
            className='min-h-screen pt-28 px-12 overflow-hidden'
            id='about'
            initial='hidden'
            whileInView='visible'
        >
            <motion.p
                className='font-bold text-4xl text-center'
                variants={slideIn('top')}
            >
                About <span className='text-sky-500'>Me</span>
            </motion.p>
            <div className='flex flex-col gap-8 mt-12'>
                <motion.div variants={slideIn('left')}>
                    <Image
                        className='p-8'
                        src='https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/profiles/profile-2.png'
                        alt=''
                        width='1280'
                        height='1280'
                    />
                </motion.div>
                <motion.div variants={slideIn('right')}>
                    <p className='font-bold text-2xl'>Mobile & Web Developer</p>
                    <p className='text-slate-300 mt-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className='text-slate-300 mt-4'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button className='font-bold text-slate-950 bg-sky-500 rounded-lg px-4 py-2.5 mt-12'>Read More</button>
                </motion.div>
            </div>
        </motion.div>
    )
}
