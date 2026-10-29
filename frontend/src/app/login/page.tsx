"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Crown,
  HardHat,
  Loader2,
  ShieldCheck,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthScreen } from "@/components/auth/auth-screen";
import { useAuth } from "@/components/auth/auth-provider";
import { ApiError } from "@/lib/auth-api";
import { roleHome } from "@/lib/roles";

type LoginRole = "CITIZEN" | "OFFICER" | "WARD_REPRESENTATIVE" | "FIELD_WORKER" | "SUPER_ADMIN";

interface RoleOption {
  name: LoginRole;
  label: string;
  description: string;
  icon: LucideIcon;
}

const ROLES: RoleOption[] = [
  {
    name: "CITIZEN",
    label: "Citizen",
    description: "Report issues and track complaints in your ward",
    icon: UserRound,
  },
  {
    name: "OFFICER",
    label: "Officer",
    description: "Review complaints and manage civic operations",
    icon: ShieldCheck,
  },
  {
    name: "WARD_REPRESENTATIVE",
    label: "Ward Rep",
    description: "Manage ward-level governance and representation",
    icon: Building2,
  },
  {
    name: "FIELD_WORKER",
    label: "Field Worker",
    description: "Execute assigned work orders on the ground",
    icon: HardHat,
  },
  {
    name: "SUPER_ADMIN",
    label: "Super Admin",
    description: "Full platform control and panel management",
    icon: Crown,
  },
];

const DEMO_ACCOUNTS: Partial<Record<LoginRole, { email: string; password: string }>> = {
  CITIZEN: {
    email: process.env.NEXT_PUBLIC_SHOWCASE_CITIZEN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_SHOWCASE_CITIZEN_PASSWORD ?? "",
  },
  OFFICER: {
    email: process.env.NEXT_PUBLIC_SHOWCASE_OFFICER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_SHOWCASE_OFFICER_PASSWORD ?? "",
  },
  WARD_REPRESENTATIVE: {
    email: process.env.NEXT_PUBLIC_SHOWCASE_WARD_REP_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_SHOWCASE_WARD_REP_PASSWORD ?? "",
  },
  FIELD_WORKER: {
    email: process.env.NEXT_PUBLIC_SHOWCASE_FIELD_WORKER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_SHOWCASE_FIELD_WORKER_PASSWORD ?? "",
  },
  SUPER_ADMIN: {
    email: process.env.NEXT_PUBLIC_SHOWCASE_SUPER_ADMIN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_SHOWCASE_SUPER_ADMIN_PASSWORD ?? "",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { user, login, isLoading: authLoading } = useAuth();
  const [selectedRole, setSelectedRole] = React.useState<LoginRole | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (authLoading) return;
    if (user && localStorage.getItem("ca_refresh")) {
      router.replace(roleHome(user.role.name));
    }
  }, [authLoading, user, router]);

  const signIn = async (loginEmail: string, loginPassword: string) => {
    setError(null);
    setSubmitting(true);
    try {
      const me = await login(loginEmail.trim(), loginPassword);
      router.replace(roleHome(me.role.name));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to sign in. Is the server running?");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    await signIn(email, password);
  };

  const handleDemoLogin = async () => {
    if (!selectedRole) return;
    const account = DEMO_ACCOUNTS[selectedRole];
    if (!account?.email || !account.password) {
      setError("Demo sign-in is not configured for this role.");
      return;
    }
    setEmail(account.email);
    setPassword(account.password);
    await signIn(account.email, account.password);
  };

  const selectedRoleOption = ROLES.find((role) => role.name === selectedRole);
  const SelectedRoleIcon = selectedRoleOption?.icon;

  return (
    <AuthScreen
      title={selectedRoleOption ? "Sign in" : "Select your role"}
      subtitle={
        selectedRoleOption
          ? `Signing in as ${selectedRoleOption.label}`
          : "Choose your role to access the appropriate workspace."
      }
      compact
    >
      {selectedRoleOption && SelectedRoleIcon ? (
        <>
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedRole(null);
                setError(null);
              }}
              aria-label="Back to role selection"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
              <SelectedRoleIcon className="h-4 w-4" />
              {selectedRoleOption.label}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 noValidate">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-danger-200 bg-danger-50 px-3 py-2.5 text-sm text-danger-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {DEMO_ACCOUNTS[selectedRoleOption.name]?.email &&
              DEMO_ACCOUNTS[selectedRoleOption.name]?.password && (
              <Button
                type="button"
                variant="outline"
                className="w-full border-ai-200 bg-ai-50 text-ai-700 hover:bg-ai-100 hover:text-ai-800"
                onClick={handleDemoLogin}
                disabled={submitting}
              >
                <Zap className="mr-2 h-4 w-4" />
                Quick demo login
              </Button>
              )}
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map(({ name, label, description, icon: Icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setSelectedRole(name);
                  setError(null);
                }}
                className={`flex min-h-24 flex-col items-center justify-center rounded-xl border border-border-soft px-3 py-2.5 text-center transition-colors hover:border-primary-200 hover:bg-primary-50 focus-visible:border-primary-500 ${
                  name === "SUPER_ADMIN" ? "col-span-2 min-h-20" : ""
                }`}
              >
                <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="mt-0.5 max-w-36 text-[10px] leading-3 text-slate-400">
                  {description}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3.5 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </>
      )}
    </AuthScreen>
  );
}