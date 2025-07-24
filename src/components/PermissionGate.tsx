import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, CheckCircle, LogOut } from "lucide-react";

interface PermissionGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY_EMAIL = "invitro-user-email";
const STORAGE_KEY_PERMISSION = "invitro-user-permission";

export default function PermissionGate({ children }: PermissionGateProps) {
  const [email, setEmail] = useState("");
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAccessBanner, setShowAccessBanner] = useState(false);

  // On mount, check localStorage for previous session
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
    const storedPermission = localStorage.getItem(STORAGE_KEY_PERMISSION);
    if (storedEmail && storedPermission === "true") {
      setEmail(storedEmail);
      setHasPermission(true);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setHasPermission(null);
    setSubmitted(false);
    try {
      // Check permission
      const res = await fetch("/api/permissions/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setHasPermission(data.hasPermission);

      // Log the access attempt
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          accessAttempt: true,
          hasAccess: data.hasPermission,
          accessType: data.hasPermission ? "investments_tab" : "access_request",
          requestType: data.hasPermission ? "authorized_access" : "unauthorized_request",
        }),
      });

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

  // Hide the access granted banner after 3 seconds
  useEffect(() => {
    if (showAccessBanner) {
      const timer = setTimeout(() => setShowAccessBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAccessBanner]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_PERMISSION);
    setEmail("");
    setHasPermission(null);
    setSubmitted(false);
    setError("");
  };

  // If user has permission and submitted, show children (protected content) and logout button
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

  // If submitted and no permission, show request received message
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
                We've received your request to access our deals. We will be in touch shortly.
              </p>
            </div>
            <Button onClick={() => { setSubmitted(false); setEmail(""); setHasPermission(null); }} className="w-full">
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access form
  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Access Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Please enter your email address to access investment opportunities.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || !email.trim()}>
              {loading ? "Checking..." : "Request Access"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 