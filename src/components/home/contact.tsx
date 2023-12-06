import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'

export default function Contact() {
    return (
        <motion.div
            className='min-h-screen pt-28 px-12 overflow-hidden'
            id='contact'
            initial='hidden'
            whileInView='visible'
        >
            <motion.p
                className='font-bold text-4xl text-center'
                variants={slideIn('top')}
            >
                Contact <span className='text-sky-500'>Me!</span>
            </motion.p>
            <motion.p
                className='text-slate-300 text-center mt-12'
                variants={slideIn('top')}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </motion.p>
            <motion.div
                className='w-full flex-col items-start bg-slate-900 rounded-xl p-8 mt-8'
                variants={slideIn('right')}
            >
                <p className='font-bold my-4'>Your Name</p>
                <input
                    className='w-full bg-slate-800 rounded-lg outline-none p-4'
                    placeholder='What&apos;s your name?'
                />
                <p className='font-bold my-4'>Your Email</p>
                <input
                    className='w-full bg-slate-800 rounded-lg outline-none p-4'
                    placeholder='What&apos;s your email addres?'
                />
                <p className='font-bold my-4'>Your Message</p>
                <textarea
                    className='w-full h-[14rem] bg-slate-800 rounded-lg outline-none p-4'
                    placeholder='What you want to say?'
                />
                <button className='font-bold text-slate-950 bg-sky-500 rounded-lg px-4 py-2.5 mt-8'>Send Message</button>
            </motion.div>
        </motion.div>
    )
}
