import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reports = [
  { name: "January Sales Report", date: "2023-02-01", downloads: 120 },
  { name: "February Sales Report", date: "2023-03-01", downloads: 85 },
  { name: "March Sales Report", date: "2023-04-01", downloads: 97 },
  { name: "April Sales Report", date: "2023-05-01", downloads: 102 },
  { name: "May Sales Report", date: "2023-06-01", downloads: 110 },
]

export function ReportsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Downloads</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.name}>
            <TableCell>{report.name}</TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>{report.downloads}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

