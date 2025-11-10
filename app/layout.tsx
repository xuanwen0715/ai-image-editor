import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const _legacyMetadata: Metadata = {
  title: "AI Image Editor",
  description: "AI图像编辑工具站 - 基于Next.js和OpenRouter API",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-image-editor-iota.vercel.app"),
  title: {
    default: "AI Image Editor",
    template: "%s | AI Image Editor",
  },
  description: "Natural language image editing powered by Gemini via OpenRouter.",
  keywords: ["AI", "image", "editor", "Next.js", "OpenRouter", "Gemini"],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#60a5fa" },
  ],
  openGraph: {
    type: "website",
    title: "AI Image Editor",
    description: "Edit any photo with simple text commands.",
    url: "https://ai-image-editor-iota.vercel.app",
    siteName: "AI Image Editor",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "AI Image Editor" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Editor",
    description: "Edit any photo with simple text commands.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " antialiased bg-background text-foreground"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
