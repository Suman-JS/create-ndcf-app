import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div
                className={`${inter.className} bg-light dark:bg-dark relative min-h-screen transition-all`}
            >
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}
