import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarField from "@/components/StarField";
import GlowCard from "@/components/GlowCard";
import { useToast } from "@/hooks/use-toast";

type TabKey = "login" | "signup";

const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // e.g., http://localhost:3000

console.log("API_BASE:", API_BASE); // Debugging line

const Auth = () => {
  const [tab, setTab] = useState<TabKey>("login");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false); 
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await safeJson(res);
        throw new Error(err?.message || "Login failed");
      }

      const data = await res.json(); // { token }
      localStorage.setItem("auth_token", data.token);

      toast({ title: "Welcome back!", description: "Successfully logged in." });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string; // NOTE: backend expects 'name'
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const err = await safeJson(res);
        throw new Error(err?.message || "Signup failed");
      }

      toast({
        title: "Account created!",
        description: "Please log in with your new credentials.",
      });

      // Switch to login tab in a controlled way
      setTab("login");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error?.message || "Please try again with different credentials.",
        variant: "destructive",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-cosmic-deep flex items-center justify-center p-4">
      <StarField />
      <div className="relative z-10 w-full max-w-md">
        <GlowCard>
          <Card className="border-cosmic-accent/20 bg-cosmic-dark/80 backdrop-blur-lg">
            <CardHeader className="text-center space-y-4">
              <div className="cosmic-glow mx-auto w-16 h-16 rounded-full bg-gradient-cosmic flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <CardTitle className="text-2xl font-bold text-cosmic-text">
                Welcome to CosmosSutra
              </CardTitle>
              <CardDescription className="text-cosmic-text/70">
                Begin your journey through sacred wisdom
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-cosmic-surface border-cosmic-accent/20">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-cosmic-accent data-[state=active]:text-cosmic-dark"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-cosmic-accent data-[state=active]:text-cosmic-dark"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-cosmic-text">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        className="bg-cosmic-surface/50 border-cosmic-accent/30 text-cosmic-text placeholder:text-cosmic-text/50 focus:border-cosmic-accent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-cosmic-text">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        className="bg-cosmic-surface/50 border-cosmic-accent/30 text-cosmic-text placeholder:text-cosmic-text/50 focus:border-cosmic-accent"
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full bg-gradient-cosmic hover:opacity-90 text-cosmic-dark font-medium"
                    >
                      {loginLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGN UP */}
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-cosmic-text">Name</Label>
                      <Input
                        id="signup-name"
                        name="name" // <-- backend expects 'name'
                        type="text"
                        required
                        className="bg-cosmic-surface/50 border-cosmic-accent/30 text-cosmic-text placeholder:text-cosmic-text/50 focus:border-cosmic-accent"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-cosmic-text">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        required
                        className="bg-cosmic-surface/50 border-cosmic-accent/30 text-cosmic-text placeholder:text-cosmic-text/50 focus:border-cosmic-accent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-cosmic-text">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        className="bg-cosmic-surface/50 border-cosmic-accent/30 text-cosmic-text placeholder:text-cosmic-text/50 focus:border-cosmic-accent"
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={signupLoading}
                      className="w-full bg-gradient-cosmic hover:opacity-90 text-cosmic-dark font-medium"
                    >
                      {signupLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </GlowCard>
      </div>
    </div>
  );
};

// Helper: safely parse JSON error bodies
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default Auth;
