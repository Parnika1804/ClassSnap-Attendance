import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PhotoUploader from "@/components/PhotoUploader";
import AttendanceTable, { StudentAttendance } from "@/components/AttendanceTable";
import ExportButton from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Loader2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface Class {
  id: string;
  name: string;
  section: string | null;
}

const Attendance = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!user) return;
      const { data } = await supabase.from("classes").select("id, name, section").order("name");
      setClasses(data || []);
      setLoading(false);
    };
    fetchClasses();
  }, [user]);

  const handleUpload = async (file: File) => {
    if (!selectedClass) {
      toast({ title: "Select a Class", description: "Please select a class first.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setHasProcessed(false);

    // Fetch students for selected class and simulate AI detection
    const { data: classStudents } = await supabase
      .from("students")
      .select("id, full_name, roll_number")
      .eq("class_id", selectedClass);

    await new Promise((r) => setTimeout(r, 2000));

    const mockResults: StudentAttendance[] = (classStudents || []).map((s) => ({
      id: s.id,
      name: s.full_name,
      rollNumber: s.roll_number,
      status: Math.random() > 0.2 ? "present" : Math.random() > 0.5 ? "late" : "absent",
      confidence: Math.floor(Math.random() * 15) + 85,
    }));

    setStudents(mockResults);
    setIsProcessing(false);
    setHasProcessed(true);
    toast({ title: "Processing Complete", description: `Detected ${mockResults.filter((s) => s.status === "present").length} present students.` });
  };

  if (loading) {
    return <DashboardLayout><div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></DashboardLayout>;
  }

  if (classes.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <GraduationCap className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No classes yet</h3>
          <p className="text-muted-foreground mb-6">Create a class and add students first.</p>
          <Link to="/classes"><Button variant="gradient">Create a Class</Button></Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Take Attendance</h1>
          <p className="text-muted-foreground mt-1">Upload a class photo to automatically detect students</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>{cls.name} {cls.section && `- ${cls.section}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasProcessed && <ExportButton students={students} />}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <PhotoUploader onUpload={handleUpload} isProcessing={isProcessing} />
          <AttendanceTable students={students} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
