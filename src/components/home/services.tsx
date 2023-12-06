import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { BiCodeBlock, BiMobileAlt, BiPencil } from 'react-icons/bi'
import { SiDart, SiExpress, SiFirebase, SiFlutter, SiJavascript, SiJetpackcompose, SiKotlin, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiSupabase, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { fadeIn, slideIn } from '@/utils/motion'

export default function Services() {
    const services = [
        {
            icon: <BiMobileAlt size='72' />,
            title: 'Mobile Development',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            icon: <BiCodeBlock size='72' />,
            title: 'Web Development',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            icon: <BiPencil size='72' />,
            title: 'Content Writter',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    ]
    const techs = [
        { icon: <SiJavascript /> },
        { icon: <SiTypescript /> },
        { icon: <SiNodedotjs /> },
        { icon: <SiReact />, title: 'ReactJS' },
        { icon: <SiNextdotjs />, title: 'NextJS' },
        { icon: <SiTailwindcss /> },
        { icon: <SiDart /> },
        { icon: <SiFlutter /> },
        { icon: <SiKotlin /> },
        { icon: <SiJetpackcompose /> },
        { icon: <SiExpress /> },
        { icon: <SiFirebase /> },
        { icon: <SiSupabase /> },
        { icon: <SiMongodb /> },
        { icon: <SiPostgresql /> },
    ]

    return (
        <motion.div
            className='min-h-screen pt-28 px-12'
            id='services'
            initial='hidden'
            whileInView='visible'
        >
            <motion.p
                className='font-bold text-4xl text-center'
                variants={slideIn('top')}
            >
                My <span className='text-sky-500'>Services</span>
            </motion.p>
            <motion.p
                className='text-slate-300 text-center mt-12'
                variants={slideIn('top')}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </motion.p>
            <div className='flex flex-wrap justify-center gap-8 mt-8'>
                {services.map((service, i) => (
                    <motion.div
                        key={service.title}
                        variants={fadeIn(i * .2)}
                    >
                        <Tilt className='w-96 text-center bg-slate-800 border-4 border-sky-500 rounded-xl p-8'>
                            <span className='flex justify-center text-sky-500'>{service.icon}</span>
                            <p className='font-bold text-2xl mt-4'>{service.title}</p>
                            <p className='text-slate-300 mt-4'>{service.description}</p>
                            <button className='font-bold text-slate-950 bg-sky-500 rounded-lg px-4 py-2.5 mt-8'>Read More</button>
                        </Tilt>
                    </motion.div>
                ))}
            </div>
            <p className='font-bold text-2xl text-center mt-12'>Tech i have been used</p>
            <div className='flex flex-wrap justify-center gap-8 text-sky-500 text-3xl mt-8'>
                {techs.map((tech, i) => (
                    <motion.div
                        key={i}
                        className='cursor-pointer'
                        variants={fadeIn(i * .2)}
                    >
                        <Tilt>{tech.icon}</Tilt>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
