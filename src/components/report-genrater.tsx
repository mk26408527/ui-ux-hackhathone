"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("")

  const handleGenerateReport = () => {
    if (!reportType) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive",
      })
      return
    }

    // Here you would typically call an API to generate the report
    toast({
      title: "Report Generated",
      description: `Your ${reportType} report has been generated successfully.`,
    })
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={setReportType}>
        <SelectTrigger>
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sales">Sales Report</SelectItem>
          <SelectItem value="inventory">Inventory Report</SelectItem>
          <SelectItem value="customers">Customer Report</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleGenerateReport}>Generate Report</Button>
    </div>
  )
}

