'use client'

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { getFromBackend, postToBackend } from "@/store/fetchdata"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Textarea } from "@/Components/ui/textarea"
import { Search, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { baseUrl } from "@/urls.jsx";

export default function CommunityForum() {
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const discussionsPerPage = 5

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true)
        const response = await getFromBackend(`${baseUrl}/api/forum/discussions`)
        setDiscussions(response.data || [])
      } catch (error) {
        console.error("Failed to fetch discussions", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDiscussions()
  }, [])

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.content) return
    try {
      const response = await postToBackend(`${baseUrl}/api/forum/create`, newDiscussion)
      setDiscussions([response.data, ...discussions])
      setNewDiscussion({ title: "", content: "" })
    } catch (error) {
      console.error("Failed to create discussion", error)
    }
  }

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastDiscussion = currentPage * discussionsPerPage
  const indexOfFirstDiscussion = indexOfLastDiscussion - discussionsPerPage
  const currentDiscussions = filteredDiscussions.slice(indexOfFirstDiscussion, indexOfLastDiscussion)
  const totalPages = Math.ceil(filteredDiscussions.length / discussionsPerPage)

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />
      <div className="h-20"></div>
      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Community Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {loading ? (
                <p className="text-center">Loading discussions...</p>
              ) : currentDiscussions.length > 0 ? (
                currentDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="bg-white p-4 shadow-md">
                    <CardTitle className="text-lg font-semibold">{discussion.title}</CardTitle>
                    <CardContent>
                      <p>{discussion.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center">No discussions found.</p>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstDiscussion + 1} to {Math.min(indexOfLastDiscussion, filteredDiscussions.length)} of {filteredDiscussions.length} discussions
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Discussion title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              className="mb-4"
            />
            <Textarea
              placeholder="Write your discussion content here..."
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              className="mb-4"
            />
            <Button onClick={handleCreateDiscussion}>Post Discussion</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
