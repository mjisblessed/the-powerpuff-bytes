'use client'

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { getFromBackend } from "@/store/fetchdata"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { baseUrl } from "@/urls.jsx";

export default function PitchDeckView() {
  const [pitches, setPitches] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pitchesPerPage = 5

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        setLoading(true)
        const response = await getFromBackend(`${baseUrl}/api/pitchdeck/view`)
        const pitchesArray = response.data.pitches || []
        console.log(response)
        setPitches(Array.isArray(pitchesArray) ? pitchesArray : [])
      } catch (error) {
        console.error("Failed to fetch pitches", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPitches()
  }, [])

  const filteredPitches = pitches.filter((pitch) =>
    Object.values(pitch).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const indexOfLastPitch = currentPage * pitchesPerPage
  const indexOfFirstPitch = indexOfLastPitch - pitchesPerPage
  const currentPitches = filteredPitches.slice(
    indexOfFirstPitch,
    indexOfLastPitch
  )

  const totalPages = Math.ceil(filteredPitches.length / pitchesPerPage)

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />
      <div className="h-20"></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 mt-16">
        <div className="max-w-7xl w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8 space-y-8">
          <Card className="w-full shadow-md bg-gray-50 border-none">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <CardTitle className="text-2xl font-bold">Pitch Decks</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search pitch decks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-violet-500 group hover:bg-none">
                      <TableHead className="w-[100px] text-white">Date</TableHead>
                      <TableHead className="text-white">Startup Name</TableHead>
                      <TableHead className="hidden md:table-cell text-white">Description</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : currentPitches.length > 0 ? (
                      currentPitches.map((pitch) => (
                        <TableRow key={pitch.id} className="hover:bg-none"> 
                          <TableCell className="font-medium">{formatDate(pitch.date)}</TableCell>
                          <TableCell>{pitch.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{pitch.description}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                              {pitch.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No pitch decks found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstPitch + 1} to {Math.min(indexOfLastPitch, filteredPitches.length)} of {filteredPitches.length} pitch decks
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
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
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
  )
}
