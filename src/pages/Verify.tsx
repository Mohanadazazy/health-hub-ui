import { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Pill, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VerifyState {
  email?: string;
  mode?: "signin" | "signup";
  fullName?: string;
}

const RESEND_COOLDOWN = 30;

const Verify = () => {
  const { user, loading, onboardingCompleted, signInWithEmail, verifyOtp, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as VerifyState;

  const email = state.email ?? sessionStorage.getItem("verify_email") ?? "";
  const mode = state.mode ?? (sessionStorage.getItem("verify_mode") as "signin" | "signup") ?? "signin";
  const fullName = state.fullName ?? sessionStorage.getItem("signup_full_name") ?? "";

  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (email) {
      sessionStorage.setItem("verify_email", email);
      sessionStorage.setItem("verify_mode", mode);
    }
  }, [email, mode]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

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

  if (!email) {
    return <Navigate to="/auth" replace />;
  }

  const handleVerify = async (code?: string) => {
    const token = code ?? otp;
    if (token.length !== 6) return;

    setVerifying(true);
    const { error } = await verifyOtp(email, token);

    if (error) {
      setVerifying(false);
      toast({
        title: "Invalid code",
        description: error.message || "The code is incorrect or expired.",
        variant: "destructive",
      });
      setOtp("");
      return;
    }

    // If signup flow, save the full name to the profile
    if (mode === "signup" && fullName) {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await supabase
          .from("profiles")
          .update({ full_name: fullName })
          .eq("user_id", authUser.id);
        await refreshProfile();
      }
      sessionStorage.removeItem("signup_full_name");
    }

    sessionStorage.removeItem("verify_email");
    sessionStorage.removeItem("verify_mode");

    setVerifying(false);
    toast({
      title: mode === "signup" ? "Welcome!" : "Signed in",
      description:
        mode === "signup" ? "Your account has been created." : "You're now signed in.",
    });
    navigate("/onboarding", { replace: true });
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResending(true);
    const { error } = await signInWithEmail(email);
    setResending(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Code resent", description: `A new code was sent to ${email}.` });
      setOtp("");
      setCooldown(RESEND_COOLDOWN);
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem("verify_email");
    sessionStorage.removeItem("verify_mode");
    navigate(mode === "signup" ? "/signup" : "/auth", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <Pill className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MediConnect</span>
        </Link>

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {mode === "signup" ? "Edit details" : "Use a different email"}
        </button>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Verify your email</h1>
          <p className="text-muted-foreground">
            We sent a 6-digit verification code to
          </p>
          <p className="font-semibold text-foreground flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            {email}
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (value.length === 6) handleVerify(value);
              }}
              disabled={verifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-14 w-12 text-lg" />
                <InputOTPSlot index={1} className="h-14 w-12 text-lg" />
                <InputOTPSlot index={2} className="h-14 w-12 text-lg" />
                <InputOTPSlot index={3} className="h-14 w-12 text-lg" />
                <InputOTPSlot index={4} className="h-14 w-12 text-lg" />
                <InputOTPSlot index={5} className="h-14 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={() => handleVerify()}
            variant="hero"
            size="lg"
            className="w-full"
            disabled={verifying || otp.length !== 6}
          >
            {verifying ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {mode === "signup" ? "Creating your account..." : "Verifying..."}
              </>
            ) : mode === "signup" ? (
              "Verify & Create Account"
            ) : (
              "Verify Code"
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={resending || cooldown > 0}
                className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
              >
                {resending
                  ? "Sending..."
                  : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend code"}
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              The code expires in 10 minutes. Check your spam folder if you don't see it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
