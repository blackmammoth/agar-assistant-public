import "../../styles/globals.css";

import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "@/components/ui/Footer/Footer";
import ThemeProviders from "./Providers";
import Provider from "@/components/ui/Provider/SessionProvider";
import { getDictionary } from "@/get-dictionary";
import { registerLicense } from '@syncfusion/ej2-base';
import { Analytics } from '@vercel/analytics/react';


// Registering Syncfusion license key
registerLicense('YOUR LICENSE KEY');

import { i18n } from "@/i18n.config";

import { Source_Sans_3, Red_Hat_Display } from "next/font/google";

const primary = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-3",
});

const secondary = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-display",
});

export const metadata = {
  title: "Agar Assistant - Your Academic Companion in Ethiopia",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "Agar Assistant - Your Academic Companion in Ethiopia. Features include Score Tracking, Task Management, and Calendar Integration for students. Boost your academic performance with our student assistant web app.",
  applicationName: "Agar Assistant",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Agar Assistant",
    "Academic Companion",
    "Student Assistant",
    "Ethiopia",
    "Score Tracking",
    "Task Management",
    "Calendar Integration",
    "Academic Performance",
  ],
  author: { name: "Haileyesus", url: "https://namistech.co" },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  creator: "Haileyesus Dessie",
  publisher: "Haileyesus Dessie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "Agar Assistant",
    description:
      "Agar Assistant - Your Academic Companion in Ethiopia. Features include Score Tracking, Task Management, and Calendar Integration for students. Boost your academic performance with our student assistant web app.",
    url: "https://agarassistant.app",
    siteName: "Agar Assistant",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Agar Assistant",
    description:
      "Agar Assistant - Your Academic Companion in Ethiopia. Features include Score Tracking, Task Management, and Calendar Integration for students. Boost your academic performance with our student assistant web app.",
    siteId: "1467726470533754880",
    creator: "@namistech",
    creatorId: "1467726470533754880",
    images: ["https://nextjs.org/og.png"],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },

  appleWebApp: {
    title: "Apple Web App",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/assets/startup/apple-touch-startup-image-768x1004.png",
      {
        url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  category: "education",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params: {lang} }) {

  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${primary.variable} ${secondary.variable}`}
      suppressHydrationWarning
    >
      <link rel="shortcut icon" href="/favicon.ico" sizes="any"/>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <body className="font-primary">
        <Provider>
          <ThemeProviders>
            <main>
              <Navbar lang={lang} dictionary={dictionary?.navbar}/>
              {children}
              <Footer lang={lang} dictionary={dictionary?.footer}/>
              <Analytics />
            </main>
          </ThemeProviders>
        </Provider>
      </body>
    </html>
  );
}
