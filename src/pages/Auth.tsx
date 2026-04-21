import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Mail, Pill, Check, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { user, loading, onboardingCompleted, signInWithEmail, verifyOtp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    if (onboardingCompleted === false) return <Navigate to="/onboarding" replace />;
    return <Navigate to="/" replace />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setSending(true);
    const { error } = await signInWithEmail(email);
    setSending(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
      setOtp("");
    }
  };

  const handleVerifyOtp = async (code?: string) => {
    const token = code ?? otp;
    if (token.length !== 6) return;

    setVerifying(true);
    const { error } = await verifyOtp(email, token);
    setVerifying(false);

    if (error) {
      toast({
        title: "Invalid code",
        description: error.message || "The code is incorrect or expired.",
        variant: "destructive",
      });
      setOtp("");
    }
  };

  const handleResend = async () => {
    setResending(true);
    const { error } = await signInWithEmail(email);
    setResending(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Code resent", description: `A new code was sent to ${email}.` });
      setOtp("");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <button
            onClick={() => {
              setSent(false);
              setOtp("");
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Use a different email
          </button>

          <div className="text-center space-y-3">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
            <p className="text-muted-foreground">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-foreground">{email}</span>.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  if (value.length === 6) handleVerifyOtp(value);
                }}
                disabled={verifying}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={() => handleVerifyOtp()}
              variant="hero"
              size="lg"
              className="w-full"
              disabled={verifying || otp.length !== 6}
            >
              {verifying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Didn't get the code?{" "}
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-primary font-semibold hover:underline disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <Pill className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">MediConnect</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground mt-2">
              Sign in or create an account to continue
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={handleGoogleSignIn}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Magic Link */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 h-12 ${emailError ? "border-destructive" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={sending}
            >
              {sending ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Mail className="h-5 w-5 mr-2" />
              )}
              {sending ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            No password needed. We'll send you a secure link to sign in.
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12">
        <div className="text-primary-foreground text-center max-w-md">
          <div className="mb-8">
            <div className="h-24 w-24 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center">
              <Pill className="h-12 w-12" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Access Medicines from Trusted Pharmacies
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of users who trust MediConnect for their healthcare needs.
          </p>
          <div className="space-y-4 text-left">
            {[
              "Access 500+ verified pharmacies",
              "Compare prices instantly",
              "Fast doorstep delivery",
              "Passwordless, secure sign-in",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
