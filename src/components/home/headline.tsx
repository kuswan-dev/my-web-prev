import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { slideIn } from '@/utils/motion'

export default function Headline() {
    const socials = [
        { icon: <FaFacebookF />, link: '' },
        { icon: <FaTwitter />, link: '' },
        { icon: <FaGithub />, link: '' },
        { icon: <FaLinkedinIn />, link: '' }
    ]

    return (
        <motion.div
            className='min-h-screen pt-28 px-12 overflow-hidden'
            id='home'
            initial='hidden'
            whileInView='visible'
        >
            <div className='flex flex-col items-center gap-8'>
                <div>
                    <motion.p
                        className='font-bold text-slate-300 text-xl'
                        variants={slideIn('left')}
                    >
                        Hello, It&apos;s Me
                    </motion.p>
                    <motion.p
                        className='font-bold text-4xl mt-4'
                        variants={slideIn('left', .4)}
                    >
                        Tatang Kuswandi
                    </motion.p>
                    <motion.p
                        className='font-bold text-2xl mt-4'
                        variants={slideIn('left', .6)}
                    >
                        I&apos;m a
                        <TypeAnimation
                            className='text-sky-500 ml-2'
                            sequence={['Mobile Developer', 5000, 'Web Developer', 5000]}
                            speed={1}
                            repeat={Infinity}
                        />
                    </motion.p>
                    <motion.p
                        className='text-slate-300 mt-12'
                        variants={slideIn('left', .8)}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </motion.p>
                    <motion.div
                        className='flex gap-x-4 mt-12'
                        variants={slideIn('left', 1)}
                    >
                        {socials.map(social => (
                            <Link
                                key={social.link}
                                className='text-sky-500 text-2xl border border-sky-500 rounded-full p-3 hover:text-slate-950 hover:bg-sky-500'
                                href={social.link}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </motion.div>
                    <motion.button
                        className='font-bold text-slate-950 bg-sky-500 rounded-lg px-4 py-2.5 mt-12'
                        variants={slideIn('left', 1.2)}
                    >
                        Download CV
                    </motion.button>
                </div>
                <motion.div variants={slideIn('right')}>
                    <Image
                        className='p-8'
                        src='https://nhqniuujsthlqvtwtzgg.supabase.co/storage/v1/object/public/profiles/profile-1.png'
                        alt=''
                        width='1280'
                        height='1280'
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}
