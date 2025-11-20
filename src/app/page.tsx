import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Github, Linkedin, Mail, Play, FileText, Calendar, Youtube } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
                {/* Gradient Background Blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

                <div className="container px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 items-center">
                        <div className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
                                    Software Engineer <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                        Learning AI
                                    </span>
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                                    Hi, I'm Piotr. I'm documenting my journey from traditional software engineering to the world of Artificial Intelligence.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/blog" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                                        Read the Blog <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="https://www.youtube.com/@piotr-wesolowski" target="_blank" className="w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                                        Watch on YouTube
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex gap-6 pt-4">
                                <Link href="https://github.com/pwesolowski" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="h-6 w-6" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                                <Link href="https://www.linkedin.com/in/piotr-wesolowski/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin className="h-6 w-6" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link href="https://www.youtube.com/@piotr-wesolowski" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Youtube className="h-6 w-6" />
                                    <span className="sr-only">YouTube</span>
                                </Link>
                                <Link href="mailto:contact@piotrwesolowski.com" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-6 w-6" />
                                    <span className="sr-only">Email</span>
                                </Link>
                                <Link href="https://calendly.com/piowes30/30min/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Calendar className="h-6 w-6" />
                                    <span className="sr-only">Calendly</span>
                                </Link>
                            </div>
                        </div>

                        {/* Profile Image with Glow */}
                        <div className="relative flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent rounded-full blur-2xl opacity-20" />
                                <div className="relative h-full w-full overflow-hidden rounded-full border bg-muted shadow-2xl hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src="/images/profile-new.png"
                                        alt="Piotr Wesołowski"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Updates Section */}
            <section className="w-full py-20 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Updates</h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-lg">
                            Check out my latest content across different platforms.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
                        {/* Blog Card */}
                        <Link href="/blog" className="group">
                            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl">Blog</CardTitle>
                                    <CardDescription className="text-base mt-2">
                                        Deep dives into code, architecture, and AI concepts. Written for engineers.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <span className="text-sm font-medium text-primary group-hover:underline flex items-center">
                                        Read articles <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* YouTube Card */}
                        <Link href="https://www.youtube.com/@piotr-wesolowski" target="_blank" className="group">
                            <Card className="h-full transition-all hover:border-red-500/50 hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <Play className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl">YouTube</CardTitle>
                                    <CardDescription className="text-base mt-2">
                                        Video tutorials, devlogs, and tech discussions. Visual learning.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <span className="text-sm font-medium text-primary group-hover:underline flex items-center">
                                        Watch videos <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
