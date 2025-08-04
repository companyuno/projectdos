"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Trash2, Search } from "lucide-react";
import Link from "next/link";

interface Visitor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  timestamp: string;
  accredited: boolean;
  accredited_selections?: string[];
  created_at: string;
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
        v.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(v => {
        if (filterType === "accredited") return v.accredited === true;
        if (filterType === "non_accredited") return v.accredited === false;
        return true;
      });
    }

    setFilteredVisitors(filtered);
  }, [visitors, searchTerm, filterType]);

  const handleDelete = async (visitorId: number) => {
    if (!confirm("Are you sure you want to delete this visitor record?")) return;
    
    try {
      const response = await fetch(`/api/visitors?id=${visitorId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        const updatedVisitors = visitors.filter(v => v.id !== visitorId);
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
              localStorage.removeItem("invitro-user-email");
              localStorage.removeItem("invitro-user-permission");
              // Remove any other relevant keys if needed
              window.location.reload();
            }}
          >
            Reset Demo
          </Button>
          <Button
            variant="destructive"
            className="text-xs px-3 py-1 border-red-400 text-red-700 hover:bg-red-50 hover:border-red-500"
            onClick={async () => {
              if (!window.confirm('Are you sure you want to delete all visitor records? This cannot be undone.')) return;
              // Fetch all visitors
              const res = await fetch('/api/visitors');
              const visitors = await res.json();
              // Delete each visitor by ID
              for (const visitor of visitors) {
                await fetch(`/api/visitors?id=${visitor.id}`, { method: 'DELETE' });
              }
              window.location.reload();
            }}
          >
            Clear All
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
              <option value="accredited">Accredited Investors</option>
              <option value="non_accredited">Non-Accredited Investors</option>
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
          <table className="min-w-[800px] sm:min-w-[1000px] border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">First Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Last Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Email</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Timestamp</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Accredited</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Accredited Selections</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((v, i) => (
                <tr key={v.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.first_name}</td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.last_name}</td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">{v.email}</td>
                  <td className="px-2 sm:px-4 py-2 border-b font-mono text-xs">{new Date(v.timestamp).toLocaleString()}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    <span className={`px-1.5 sm:px-2 py-1 rounded text-xs ${
                      v.accredited 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {v.accredited ? '✅ Yes' : '❌ No'}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b text-xs sm:text-sm">
                    {Array.isArray(v.accredited_selections)
                      ? v.accredited_selections.join(", ")
                      : v.accredited_selections || ""}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b">
                    <Button
                      onClick={() => handleDelete(v.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 sm:h-8 w-7 sm:w-8 p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
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