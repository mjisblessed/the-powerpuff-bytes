'use client'

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuroraBackground } from "../ui/aurora-background.tsx";

const staticDiscussions = [
  { id: 1, topic: "Best AI tools?", replies: 12, category: "Tech" },
  { id: 2, topic: "How to get startup funding?", replies: 8, category: "Entrepreneurship" },
  { id: 3, topic: "Funniest coding bugs", replies: 15, category: "Humor" },
  { id: 4, topic: "Productivity hacks for students", replies: 9, category: "Self-Improvement" },
  { id: 5, topic: "Underrated startup ideas", replies: 7, category: "Innovation" }
];

export default function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const discussionsPerPage = 5;

  const filteredDiscussions = staticDiscussions.filter((discussion) =>
    Object.values(discussion).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastDiscussion = currentPage * discussionsPerPage;
  const indexOfFirstDiscussion = indexOfLastDiscussion - discussionsPerPage;
  const currentDiscussions = filteredDiscussions.slice(indexOfFirstDiscussion, indexOfLastDiscussion);
  const totalPages = Math.ceil(filteredDiscussions.length / discussionsPerPage);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />
      <div className="h-20"></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 mt-16">
        <div className="max-w-7xl w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8 space-y-8">
          <Card className="w-full shadow-md bg-gray-50 border-none">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <CardTitle className="text-2xl font-bold">Community Forum - Let's Chat!</CardTitle>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-yellow-800 group hover:bg-none">
                      <TableHead className="text-white">Topic</TableHead>
                      <TableHead className="text-white">Replies</TableHead>
                      <TableHead className="text-white">Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDiscussions.length > 0 ? (
                      currentDiscussions.map((discussion) => (
                        <TableRow key={discussion.id} className="hover:bg-none">
                          <TableCell className="font-medium">{discussion.topic}</TableCell>
                          <TableCell>{discussion.replies}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                              {discussion.category}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No discussions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstDiscussion + 1} to {Math.min(indexOfLastDiscussion, filteredDiscussions.length)} of {filteredDiscussions.length} discussions
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}