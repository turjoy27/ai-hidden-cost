import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-hidden-cost.vercel.app"),
  title: {
    default: "AI: The Hidden Cost — An Investigation into Compute & Creativity",
    template: "%s | AI: The Hidden Cost",
  },
  description:
    "An immersive educational exploration into the physical freshwater, electricity grid load, and cognitive toll of artificial intelligence.",
  keywords: [
    "AI environmental impact",
    "data center water consumption",
    "AI electricity footprint",
    "cognitive offloading",
    "AI creativity",
    "evaporative cooling",
    "carbon emissions AI",
    "Shaolei Ren",
    "Alex de Vries",
  ],
  authors: [{ name: "AI: The Hidden Cost Project", url: "https://ai-hidden-cost.vercel.app" }],
  creator: "AI: The Hidden Cost Project",
  publisher: "AI: The Hidden Cost Project",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-hidden-cost.vercel.app",
    siteName: "AI: The Hidden Cost",
    title: "AI: The Hidden Cost — An Investigation into Compute & Creativity",
    description:
      "Explore the physical reality of artificial intelligence: evaporative water cooling, electricity loads, and human creative diversity.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI: The Hidden Cost — Cinematic Educational Documentary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI: The Hidden Cost — Compute, Water & Creativity",
    description:
      "An educational investigation into the physical freshwater, electricity grid, and cognitive toll of AI.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ai-hidden-cost.vercel.app/#website",
      "url": "https://ai-hidden-cost.vercel.app",
      "name": "AI: The Hidden Cost",
      "description":
        "An immersive educational exploration into the physical freshwater, electricity, and cognitive toll of artificial intelligence.",
      "inLanguage": "en-US",
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://ai-hidden-cost.vercel.app/#article",
      "isPartOf": { "@id": "https://ai-hidden-cost.vercel.app/#website" },
      "headline": "AI: The Hidden Cost — An Investigation into Compute & Creativity",
      "description":
        "Quantifying the hidden physical freshwater consumption, electrical energy demands, and cognitive offloading trade-offs of modern generative artificial intelligence.",
      "inLanguage": "en-US",
      "about": [
        { "@type": "Thing", "name": "Artificial Intelligence" },
        { "@type": "Thing", "name": "Freshwater Conservation" },
        { "@type": "Thing", "name": "Data Center Energy Efficiency" },
        { "@type": "Thing", "name": "Human Divergent Thinking" },
      ],
      "citation": [
        "https://doi.org/10.48550/arXiv.2304.03271",
        "https://doi.org/10.1016/j.joule.2023.09.004",
        "https://doi.org/10.1109/TTS.2023.3283282",
        "https://doi.org/10.1126/sciadv.adn5290",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-slate-100 antialiased min-h-screen selection:bg-cyan selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
