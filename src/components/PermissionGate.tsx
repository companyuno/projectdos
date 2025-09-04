import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, CheckCircle } from "lucide-react";

interface PermissionGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY_EMAIL = "invitro-user-email";
const STORAGE_KEY_PERMISSION = "invitro-user-permission";

export default function PermissionGate({ children }: PermissionGateProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accreditedSelections, setAccreditedSelections] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAccessBanner, setShowAccessBanner] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [hasExistingInfo, setHasExistingInfo] = useState(false);

  const ACCREDITED_OPTIONS = [
    "I earned over $200,000 individually (or $300,000 with my spouse) in each of the last two years and expect the same this year",
    "I have a net worth over $1 million, excluding my primary residence",
    "I hold a qualifying financial license (Series 7, 65, or 82)",
    "I am a knowledgeable employee of a private investment fund",
    "I represent an entity with over $5 million in assets, or where all equity owners are accredited investors",
    "I am not an accredited investor",
  ];

  // On mount, prefill from previous session and auto-check allowlist if info exists
  useEffect(() => {
    let infoEmail = "";
    try {
      const infoRaw = localStorage.getItem("invitro-user-info");
      if (infoRaw) {
        const info = JSON.parse(infoRaw || "{}");
        if (info.firstName) setFirstName(info.firstName);
        if (info.lastName) setLastName(info.lastName);
        if (info.email) {
          setEmail(info.email);
          infoEmail = info.email;
        }
        setHasExistingInfo(true);
      }
      const acc = localStorage.getItem("invitro-accredited-selections");
      if (acc) setAccreditedSelections(JSON.parse(acc));
    } catch {}

    const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
    const storedPermission = localStorage.getItem(STORAGE_KEY_PERMISSION);
    const accreditedFlag = localStorage.getItem("invitro-accredited") === "true";

    // Only auto-allow if permission is granted AND accreditation has been completed previously
    if (storedEmail && storedPermission === "true" && accreditedFlag) {
      if (!email) setEmail(storedEmail);
      setHasPermission(true);
      setSubmitted(true);
      return; // Already allowed
    }

    // If we already have user info (from Research) and accreditation not completed, show Step 1 prefilled
    // (no auto-jump; user can review and click Next)

    // If we have user info and accreditation is completed, auto-check allowlist (for banner + persistence)
    if (infoEmail && accreditedFlag && (!storedPermission || storedPermission === "false")) {
      (async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/permissions/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: infoEmail }),
          });
          const data = await res.json();
          setHasPermission(Boolean(data.hasPermission));
          setSubmitted(true);
          if (data.hasPermission) {
            setShowAccessBanner(true);
            localStorage.setItem(STORAGE_KEY_EMAIL, infoEmail);
            localStorage.setItem(STORAGE_KEY_PERMISSION, "true");
          } else {
            localStorage.removeItem(STORAGE_KEY_EMAIL);
            localStorage.setItem(STORAGE_KEY_PERMISSION, "false");
          }
        } catch {
          // On error, keep showing the form fallback
          setHasExistingInfo(false);
          setSubmitted(false);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      localStorage.setItem(
        "invitro-user-info",
        JSON.stringify({ firstName, lastName, email })
      );
    } catch {}
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setHasPermission(null);
    setSubmitted(false);

    try {
      localStorage.setItem(
        "invitro-user-info",
        JSON.stringify({ firstName, lastName, email })
      );
      localStorage.setItem("invitro-accredited", "true");
      localStorage.setItem(
        "invitro-accredited-selections",
        JSON.stringify(accreditedSelections)
      );
    } catch {}

    try {
      const res = await fetch("/api/permissions/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setHasPermission(Boolean(data.hasPermission));

      try {
        await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, accredited: "true", accreditedSelections }),
        });
      } catch {}

      setSubmitted(true);
      if (data.hasPermission) {
        setShowAccessBanner(true);
        localStorage.setItem(STORAGE_KEY_EMAIL, email);
        localStorage.setItem(STORAGE_KEY_PERMISSION, "true");
      } else {
        localStorage.removeItem(STORAGE_KEY_EMAIL);
        localStorage.setItem(STORAGE_KEY_PERMISSION, "false");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAccessBanner) {
      const timer = setTimeout(() => setShowAccessBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAccessBanner]);

  const toggleSelection = (opt: string) => {
    const notAcc = ACCREDITED_OPTIONS[ACCREDITED_OPTIONS.length - 1];
    setAccreditedSelections((prev) => {
      // If selecting "Not accredited", it becomes the only selection
      if (opt === notAcc) {
        return prev.includes(notAcc) ? [] : [notAcc];
      }
      // Otherwise, deselect "Not accredited" if present, then toggle this option
      const withoutNot = prev.filter((s) => s !== notAcc);
      return withoutNot.includes(opt)
        ? withoutNot.filter((s) => s !== opt)
        : [...withoutNot, opt];
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_PERMISSION);
    try {
      localStorage.removeItem("invitro-user-info");
      localStorage.removeItem("invitro-accredited");
      localStorage.removeItem("invitro-accredited-selections");
    } catch {}
    setFirstName("");
    setLastName("");
    setEmail("");
    setAccreditedSelections([]);
    setHasPermission(null);
    setSubmitted(false);
    setError("");
    setStep(1);
    setHasExistingInfo(false);
  };

  if (submitted && hasPermission) {
    return (
      <>
        {showAccessBanner && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Access Granted</span>
            </div>
          </div>
        )}
        {children}
      </>
    );
  }

  if (submitted && hasPermission === false) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Request Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-700 text-sm">
                We&apos;ve received your request to access our deals. We will be in touch shortly.
              </p>
            </div>
            <Button onClick={() => { setSubmitted(false); setHasPermission(null); setStep(1); setHasExistingInfo(false); }} className="w-full">
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Only hide while loading; otherwise show the form (prefilled if info exists)
  if (loading) {
    return null;
  }

  // Two-step form when there is no prior info
  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 mb-0">
            <Lock className="w-5 h-5" />
            {step === 1 ? "Access Required" : "Accredited Investor Form"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {step === 1 ? (
            <>
              <p className="text-gray-600 mb-4">Please provide your details to request access to investment opportunities.</p>
              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" required className="mt-1" disabled={loading} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name" required className="mt-1" disabled={loading} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="mt-1" disabled={loading} />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !email.trim() || !firstName.trim() || !lastName.trim()}>Next</Button>
              </form>
              <Button type="button" variant="outline" onClick={handleLogout} className="w-full mt-4">Clear Info</Button>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4">Select all accreditation criteria that apply.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="space-y-3">
                    {ACCREDITED_OPTIONS.map((opt, idx) => {
                      const isLast = idx === ACCREDITED_OPTIONS.length - 1;
                      return (
                        <label
                          key={opt}
                          className={`flex items-start gap-2 cursor-pointer p-2 rounded-md ${accreditedSelections.includes(opt) ? 'bg-blue-50 border border-blue-200' : ''} ${isLast ? 'mb-4' : ''}`}
                        >
                          <input type="checkbox" checked={accreditedSelections.includes(opt)} onChange={() => toggleSelection(opt)} className="mt-1 accent-blue-600" />
                          <span className="text-sm text-gray-800 leading-snug">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div className="flex items-center justify-between gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={loading}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="min-w-[160px]"
                    disabled={
                      loading || accreditedSelections.includes(ACCREDITED_OPTIONS[ACCREDITED_OPTIONS.length - 1])
                    }
                  >
                    {loading ? "Submitting..." : "Request Access"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 