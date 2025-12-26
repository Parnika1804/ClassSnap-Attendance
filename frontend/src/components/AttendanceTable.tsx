import { Check, X, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentAttendance {
  id: string;
  name: string;
  rollNumber: string;
  status: "present" | "absent" | "late";
  confidence?: number;
}

interface AttendanceTableProps {
  students: StudentAttendance[];
}

const statusConfig = {
  present: {
    icon: Check,
    label: "Present",
    className: "bg-success/10 text-success border-success/20",
  },
  absent: {
    icon: X,
    label: "Absent",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  late: {
    icon: Clock,
    label: "Late",
    className: "bg-warning/10 text-warning border-warning/20",
  },
};

const AttendanceTable = ({ students }: AttendanceTableProps) => {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Data Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Upload a classroom photo to automatically detect and record student attendance.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Roll No.
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student, index) => {
              const config = statusConfig[student.status];
              const StatusIcon = config.icon;
              
              return (
                <tr 
                  key={student.id} 
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-4 py-4 text-sm font-medium text-foreground">
                    {student.rollNumber}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                      config.className
                    )}>
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {student.confidence !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${student.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {student.confidence}%
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
