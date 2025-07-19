"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Trash2, Search, Filter } from "lucide-react";
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
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        const visitorsData = Array.isArray(data) ? data.reverse() : [];
        setVisitors(visitorsData);
        setFilteredVisitors(visitorsData);
        setLoading(false);
      });
  }, []);

  // Filter and search visitors
  useEffect(() => {
    let filtered = visitors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(v => {
        if (filterType === "access_attempts") return v.accessAttempt;
        if (filterType === "authorized") return v.hasAccess === true;
        if (filterType === "unauthorized") return v.hasAccess === false;
        if (filterType === "deal_documents") return !v.accessAttempt;
        return true;
      });
    }

    setFilteredVisitors(filtered);
  }, [visitors, searchTerm, filterType]);

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this visitor record?")) return;
    
    try {
      const response = await fetch(`/api/visitors?index=${index}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        const updatedVisitors = visitors.filter((_, i) => i !== index);
        setVisitors(updatedVisitors);
      } else {
        alert("Failed to delete visitor record");
      }
    } catch (error) {
      console.error('Error deleting visitor:', error);
      alert("Error deleting visitor record");
    }
  };

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

      {/* Search and Filter Controls */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredVisitors.length} of {visitors.length} records
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by email, first name, or last name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Records</option>
              <option value="access_attempts">Access Attempts</option>
              <option value="authorized">Authorized Access</option>
              <option value="unauthorized">Unauthorized Requests</option>
              <option value="deal_documents">Deal Documents</option>
            </select>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
              variant="outline"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : filteredVisitors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {visitors.length === 0 ? "No visitors yet." : "No records match your search/filter criteria."}
        </div>
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
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((v, i) => {
                const originalIndex = visitors.findIndex(visitor => visitor === v);
                return (
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
                  <td className="px-4 py-2 border-b">
                    <Button
                      onClick={() => handleDelete(originalIndex)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 