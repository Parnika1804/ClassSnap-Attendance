import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentAttendance } from "./AttendanceTable";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  students: StudentAttendance[];
  disabled?: boolean;
}

const ExportButton = ({ students, disabled }: ExportButtonProps) => {
  const exportToCSV = () => {
    if (students.length === 0) {
      toast({
        title: "No data to export",
        description: "Please process a classroom photo first.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Roll Number", "Student Name", "Status", "Confidence"];
    const rows = students.map(s => [
      s.rollNumber,
      s.name,
      s.status.charAt(0).toUpperCase() + s.status.slice(1),
      s.confidence ? `${s.confidence}%` : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Attendance data has been downloaded as CSV.",
    });
  };

  return (
    <Button 
      onClick={exportToCSV} 
      variant="success" 
      size="lg"
      disabled={disabled || students.length === 0}
      className="gap-2"
    >
      <FileSpreadsheet className="h-5 w-5" />
      Export to Excel
      <Download className="h-4 w-4" />
    </Button>
  );
};

export default ExportButton;
