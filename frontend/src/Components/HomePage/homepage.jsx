"use client"

import React from 'react'
import { AuroraBackground } from "../ui/aurora-background.tsx"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Users, Lightbulb, FileText, Globe } from 'lucide-react'

const FAQs = [
  {
    question: "How can I join the community?",
    answer: "You can join by signing up on our website and participating in discussions."
  },
  {
    question: "How do I submit a pitch?",
    answer: "Visit the Pitch Deck section, fill in the required details, and submit your idea for review."
  },
  {
    question: "Where can I find government schemes?",
    answer: "Check out the Govt Schemes section to explore various funding and support options."
  }
]

const Homepage = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

      <div className="h-24"></div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Welcome to Entrepreneur Hub!
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Connect, innovate, and grow with fellow entrepreneurs.
          </p>
        </section>

        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardContent className="p-6">
            <Tabs defaultValue="forum" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/20">
                <TabsTrigger value="forum" className='text-slate-300'>Community Forum</TabsTrigger>
                <TabsTrigger value="pitch" className='text-slate-300'>Pitch Deck</TabsTrigger>
                <TabsTrigger value="schemes" className='text-slate-300'>Govt Schemes</TabsTrigger>
              </TabsList>
              <TabsContent value="forum" className="mt-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-12 h-12" />
                  <div>
                    <h3 className="text-lg font-semibold">Community Forum</h3>
                    <p>Engage in discussions, share insights, and seek advice from fellow entrepreneurs.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pitch" className="mt-4">
                <div className="flex items-center space-x-4">
                  <Lightbulb className="w-12 h-12" />
                  <div>
                    <h3 className="text-lg font-semibold">Pitch Deck</h3>
                    <p>Showcase your startup idea and connect with potential mentors and investors.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schemes" className="mt-4">
                <div className="flex items-center space-x-4">
                  <FileText className="w-12 h-12" />
                  <div>
                    <h3 className="text-lg font-semibold">Govt Schemes</h3>
                    <p>Access information on government schemes, funding options, and entrepreneurial support.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAQs.map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Homepage
