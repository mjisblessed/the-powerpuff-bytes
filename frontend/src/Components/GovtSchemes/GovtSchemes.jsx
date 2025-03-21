'use client'

import React from "react";
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ExternalLink } from "lucide-react";

export default function GovtSchemes() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />
      <div className="h-20"></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 mt-16">
        <Card className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8 text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-black">Government Schemes for Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 text-lg">
              Explore various government schemes designed to support startups and entrepreneurs.
              Click the button below to access the official portal.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 text-lg">
                <a href="https://www.startupindia.gov.in/content/sih/en/government-schemes.html" target="_blank" rel="noopener noreferrer">
                  Visit Government Schemes <ExternalLink className="inline-block ml-2" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
