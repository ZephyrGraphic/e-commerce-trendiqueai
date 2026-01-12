"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 1500)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm shadow-xl border-orange-100/50 animate-in zoom-in-95 duration-300">
                <CardHeader className="text-center pb-2">
                     <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto flex items-center justify-center mb-4 text-orange-600">
                        <Mail className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>
                        {isSubmitted 
                            ? "Check your email for reset instructions" 
                            : "Enter your email to receive a reset link"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <Alert className="bg-green-50 border-green-200 text-green-800">
                            <AlertDescription>
                                We have sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@trendique.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>
                            <Button 
                                className="w-full bg-orange-500 hover:bg-orange-600" 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                     <Button variant="link" size="sm" className="text-muted-foreground" asChild>
                        <Link href="/admin/login" className="flex items-center gap-1">
                            <ArrowLeft className="h-3 w-3" /> Back to Login
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
