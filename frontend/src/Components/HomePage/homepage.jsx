"use client"

import React from 'react'
import { AuroraBackground } from "../ui/aurora-background.tsx"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Lightbulb, Users, Building } from 'lucide-react'

const FAQs = [
  {
    question: "How can I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions."
  },
  {
    question: "How can I pitch my startup idea?",
    answer: "Go to the 'Pitch Deck' page and submit your idea. You can also connect with mentors for guidance."
  },
  {
    question: "Where can I find government schemes for startups?",
    answer: "Visit the 'Govt Schemes' page for a curated list of government initiatives supporting entrepreneurs."
  }
]

const Homepage = () => {
  return (
    <div className="relative min-h-screen bg-yellow-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

      <div className="h-24"></div>

        <main className="container mx-auto px-4 py-8 relative z-10">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-600 mb-4">
              Welcome to the Entrepreneurial Hub!
            </h1>
            <p className="text-xl text-orange-800 max-w-2xl mx-auto">
              Your go-to platform for startup discussions, pitching ideas, and exploring government support.
            </p>
          </section>

          <Card className="bg-white/10 backdrop-blur-lg border-none text-orange-900">
            <CardContent className="p-6">
              <Tabs defaultValue="forum" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-orange-200">
                  <TabsTrigger value="forum" className='text-orange-800'>Community Forum</TabsTrigger>
                  <TabsTrigger value="pitchdeck" className='text-orange-800'>Pitch Deck</TabsTrigger>
                  <TabsTrigger value="govtstat" className='text-orange-800'>Govt Schemes</TabsTrigger>
                </TabsList>
                <TabsContent value="forum" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <Users className="w-12 h-12 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Community Forum</h3>
                      <p>Discuss ideas, ask questions, and collaborate with fellow entrepreneurs.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pitchdeck" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <Lightbulb className="w-12 h-12 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Pitch Deck</h3>
                      <p>Present your startup ideas and connect with mentors and investors.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="govtstat" className="mt-4">
                  <div className="flex items-center space-x-4"> 
                  <Building className="w-12 h-12 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Government Schemes</h3>
                      <p>Explore funding and support programs offered by the government for startups.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-orange-700 mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FAQs.map((faq, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-none text-orange-900">
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
