import './globals.css';

import { type Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ConfigStoreProvider } from '~/stores/config/config-store-provider';
import { TimerStoreProvider } from '~/stores/timer/timer-store-provider';
import { Logo } from '~/components/logo';
import { PostHogProvider } from '~/providers/PostHogProvider';

export const metadata: Metadata = {
  title: 'Free Online Poker Timer for Home Games | HomeGameClock.com',
  description: 'The best free online poker timer for home games. Professional tournament clock with custom blind levels, no ads, and no registration required.',
  keywords: 'free poker clock, free poker timer, online poker clock, online poker timer, best poker timer, home game timer, poker blinds timer, tournament clock, poker tournament timer',
  openGraph: {
    title: 'Free Online Poker Timer for Home Games | HomeGameClock.com',
    description: 'The best free online poker timer for home games. Professional tournament clock with custom blind levels, no ads, and no registration required.',
    url: 'https://homegameclock.com',
    siteName: 'HomeGameClock.com',
    type: 'website',
    locale: 'en_US',
  }
}

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable}`}>
      <body>
        <PostHogProvider>
          <ConfigStoreProvider>
            <TimerStoreProvider>
              <div className="relative flex min-h-screen flex-col bg-background">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 p-4 backdrop-blur-sm">
                  <Logo />
                </header>
                <main className="flex-1">{children}</main>
              </div>
            </TimerStoreProvider>
          </ConfigStoreProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}