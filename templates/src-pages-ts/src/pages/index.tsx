import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                {/* Next.js */}
                <Link
                    href="https://nextjs.org/docs"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/next.svg"
                                    alt="Next.js"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    NEXT.js
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            NEXT.js offers a lightly opinionated, heavily
                            optimized approach to create applications using
                            React. It&apos;s the industry standard and
                            we&apos;re proud to build on top of it.
                        </CardContent>
                    </Card>
                </Link>

                {/* Docker */}
                <Link
                    href="https://docs.docker.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/docker.svg"
                                    alt="Docker"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    Docker
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            Docker is a platform for developing, shipping, and
                            running applications in containers. It makes the
                            issue &quot;It worked on my machine&quot; go away.
                        </CardContent>
                    </Card>
                </Link>

                {/* TypeScript */}
                <Link
                    href="https://www.typescriptlang.org/docs/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/typescript.svg"
                                    alt="TypeScript"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    TypeScript
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            We firmly belive TypeScript will help you be a
                            better developer. Whether you&apos;e new to JS or a
                            seasoned pro, the &quot;strictness&quot; of
                            TypeScript leads to a smoother building.
                        </CardContent>
                    </Card>
                </Link>

                {/* TailwindCss */}
                <Link
                    href="https://tailwindcss.com/docs"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/tailwind.svg"
                                    alt="TailwindCSS"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    Tailwind CSS
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            Tailwind CSS is a utility-first CSS framework that
                            helps you build beautiful, responsive designs
                            without any extra configuration. It&apos;s built
                            with utility-first principals, and is completely
                            customizable and extendable.
                        </CardContent>
                    </Card>
                </Link>

                {/* Shadcn */}
                <Link
                    href="https://ui.shadcn.com/docs"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/shadcn.svg"
                                    alt="shadcn/ui"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    shadcn/ui
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            shadcn/ui offers a collection of beautifully
                            designed, accessible, and customizable React
                            components. It&apos;s the primitives with the
                            flexibility of Tailwind CSS and acccessability of
                            Radix UI.
                        </CardContent>
                    </Card>
                </Link>

                {/* CF */}

                <Link
                    href="https://docs.cloudfoundry.org/#read-the-docs"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <Card className="h-60 w-[400px] bg-[rgba(255,255,255,0.05)] text-black">
                        <CardHeader className="rounded-tl-md rounded-tr-md bg-white/25 dark:bg-white/40">
                            <CardTitle className="-p-2 flex items-center gap-x-3">
                                <Image
                                    src="/cf.svg"
                                    alt="Cloud Foundry"
                                    width={40}
                                    height={40}
                                />
                                <div className="font-bold dark:text-white">
                                    Cloud Foundry
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-pretty p-4 font-normal text-black dark:text-white">
                            Cloud Foundry is an open-source cloud application
                            platform that provides a faster and easier way to
                            test, deploy applications. It will help you spin a
                            cloud-native application in minutes with a single
                            command.
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div className="mt-6 rounded-sm bg-black/10 p-3 text-center">
                <pre className="text-xl">
                    Get started by editing
                    <code className="rounded-[4px] bg-[#e3dddd] p-[4px] font-mono text-[0.9em] text-[#333]">
                        src/pages/index.tsx
                    </code>
                </pre>
            </div>

            <div className="absolute bottom-5 right-3">
                <ThemeToggle />
            </div>
        </main>
    );
}
