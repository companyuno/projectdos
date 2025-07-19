"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";

interface Visitor {
  firstName: string;
  lastName: string;
  email: string;
  timestamp: string;
  accredited?: string;
  accreditedSelections?: string[];
  accessAttempt?: boolean;
  hasAccess?: boolean;
  accessType?: string;
  requestType?: string;
}

export default function AdminVisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        setVisitors(Array.isArray(data) ? data.reverse() : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-8 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Visitor Log</h1>
        <Link href="/admin/permissions">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Manage Permissions
          </Button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : visitors.length === 0 ? (
        <div>No visitors yet.</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-[1200px] border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left">First Name</th>
                <th className="px-4 py-2 border-b text-left">Last Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Timestamp</th>
                                  <th className="px-4 py-2 border-b text-left">Access Type</th>
                  <th className="px-4 py-2 border-b text-left">Request Type</th>
                  <th className="px-4 py-2 border-b text-left">Access Granted</th>
                <th className="px-4 py-2 border-b text-left">Accredited</th>
                <th className="px-4 py-2 border-b text-left">Accredited Selections</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-b">{v.firstName}</td>
                  <td className="px-4 py-2 border-b">{v.lastName}</td>
                  <td className="px-4 py-2 border-b">{v.email}</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">{new Date(v.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {v.accessType === 'access_request' ? 'Access Request' : 'Investment Access'}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Deal Document
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        v.requestType === 'unauthorized_request' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {v.requestType === 'unauthorized_request' ? '🔒 Unauthorized Request' : '✅ Authorized Access'}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        v.hasAccess 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {v.hasAccess ? '✅ Granted' : '❌ Denied'}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{v.accredited !== undefined ? String(v.accredited) : ""}</td>
                  <td className="px-4 py-2 border-b">
                    {Array.isArray(v.accreditedSelections)
                      ? v.accreditedSelections.join(", ")
                      : v.accreditedSelections || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 