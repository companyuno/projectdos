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
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Visitor Log</h1>
        <div className="flex gap-2 items-center">
          <Link href="/admin/permissions">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Manage Permissions
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 border-red-400 text-red-700 hover:bg-red-50 hover:border-red-500"
            onClick={() => {
              localStorage.removeItem("invitro-accredited");
              localStorage.removeItem("invitro-accredited-selections");
              localStorage.removeItem("invitro-user-info");
              // Remove any other relevant keys if needed
              window.location.reload();
            }}
          >
            Reset Demo
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6">
        <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          Showing {filteredVisitors.length} of {visitors.length} records
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <Input
                placeholder="Search by email, first name, or last name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md bg-white text-xs sm:text-sm"
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
              className="text-xs sm:text-sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredVisitors.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
          {visitors.length === 0 ? "No visitors yet." : "No records match your search/filter criteria."}
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-[1000px] sm:min-w-[1200px] border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">First Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Last Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Email</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Timestamp</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Access Type</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Request Type</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Access Granted</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Accredited</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Accredited Selections</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((v, i) => {
                const originalIndex = visitors.findIndex(visitor => visitor === v);
                return (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.firstName}</td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.lastName}</td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.email}</td>
                  <td className="px-2 sm:px-4 py-2 border-b font-mono text-xs">{new Date(v.timestamp).toLocaleString()}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className="px-1.5 sm:px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {v.accessType === 'access_request' ? 'Access Request' : 'Investment Access'}
                      </span>
                    ) : (
                      <span className="px-1.5 sm:px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Deal Document
                      </span>
                    )}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className={`px-1.5 sm:px-2 py-1 rounded text-xs ${
                        v.requestType === 'unauthorized_request' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {v.requestType === 'unauthorized_request' ? '🔒 Unauthorized Request' : '✅ Authorized Access'}
                      </span>
                    ) : (
                      <span className="px-1.5 sm:px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    {v.accessAttempt ? (
                      <span className={`px-1.5 sm:px-2 py-1 rounded text-xs ${
                        v.hasAccess 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {v.hasAccess ? '✅ Granted' : '❌ Denied'}
                      </span>
                    ) : (
                      <span className="px-1.5 sm:px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.accredited !== undefined ? String(v.accredited) : ""}</td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">
                    {Array.isArray(v.accreditedSelections)
                      ? v.accreditedSelections.join(", ")
                      : v.accreditedSelections || ""}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    <Button
                      onClick={() => handleDelete(originalIndex)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 sm:h-8 w-7 sm:w-8 p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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