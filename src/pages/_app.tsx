import { Inter } from 'next/font/google'
import { useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { AppProps } from 'next/app'

import '@/styles/editor.css'
import '@/styles/globals.css'
import '@/styles/highlight.css'

const inter = Inter({ subsets: ['latin'] })
dayjs.extend(relativeTime)

export default function App({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() => createPagesBrowserClient())

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <div className={inter.className}>
                <Component {...pageProps} />
            </div>
        </SessionContextProvider>
    )
}
