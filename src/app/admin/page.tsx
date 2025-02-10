"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Package, Loader2, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Check authentication on component mount
  // (Ensure that /api/check-auth includes credentials in your implementation)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        });
        if (response.ok) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure the authToken cookie is stored and sent
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
        setIsCorrect(true);
        // Wait a bit, then refresh and navigate to dashboard
        setTimeout(() => {
          router.refresh();
          router.push("/dashboard");
        }, 1000);
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true);
        toast({
          title: "Account locked",
          description: "Too many failed attempts. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLocked}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLocked}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full transition-all duration-200 hover:bg-blue-600" disabled={isLoading || isLocked}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Locked
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            {attempts > 0 && !isLocked && (
              <p className="mt-4 text-sm text-red-500 text-center">{`Failed attempts: ${attempts}/3`}</p>
            )}
            {isLocked && (
              <p className="mt-4 text-sm text-red-500 text-center">Account locked. Please try again later.</p>
            )}
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex items-center justify-center text-green-500"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                <p className="text-sm font-semibold">Correct password</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
