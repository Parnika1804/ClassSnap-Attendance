import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  GraduationCap,
  Camera,
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
} from "lucide-react";

interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  todaySessions: number;
  avgAttendance: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    totalStudents: 0,
    todaySessions: 0,
    avgAttendance: 0,
  });
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch classes count
        const { count: classesCount } = await supabase
          .from("classes")
          .select("*", { count: "exact", head: true });

        // Fetch students count
        const { count: studentsCount } = await supabase
          .from("students")
          .select("*", { count: "exact", head: true });

        // Fetch today's sessions
        const today = new Date().toISOString().split("T")[0];
        const { count: todayCount } = await supabase
          .from("attendance_sessions")
          .select("*", { count: "exact", head: true })
          .eq("date", today);

        // Fetch recent sessions with class info
        const { data: sessions } = await supabase
          .from("attendance_sessions")
          .select(`
            *,
            classes (name, section)
          `)
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalClasses: classesCount || 0,
          totalStudents: studentsCount || 0,
          todaySessions: todayCount || 0,
          avgAttendance: 87, // Placeholder
        });

        setRecentSessions(sessions || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "Teacher"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your classes today.
            </p>
          </div>
          <Link to="/attendance">
            <Button variant="gradient" size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              Take Attendance
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Classes"
            value={stats.totalClasses}
            icon={GraduationCap}
            variant="default"
            subtitle="Active classes"
          />
          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            variant="success"
            subtitle="Registered"
          />
          <StatsCard
            title="Today's Sessions"
            value={stats.todaySessions}
            icon={Camera}
            variant="warning"
            subtitle="Attendance taken"
          />
          <StatsCard
            title="Avg. Attendance"
            value={`${stats.avgAttendance}%`}
            icon={TrendingUp}
            variant="default"
            subtitle="This week"
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/classes">
                <div className="group p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-foreground">Add Class</h3>
                  <p className="text-sm text-muted-foreground">Create a new class</p>
                </div>
              </Link>
              
              <Link to="/students">
                <div className="group p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-foreground">Add Students</h3>
                  <p className="text-sm text-muted-foreground">Register students</p>
                </div>
              </Link>
              
              <Link to="/attendance">
                <div className="group p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-foreground">Take Attendance</h3>
                  <p className="text-sm text-muted-foreground">Upload class photo</p>
                </div>
              </Link>
              
              <Link to="/history">
                <div className="group p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-foreground">View History</h3>
                  <p className="text-sm text-muted-foreground">Past attendance</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {recentSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">No activity yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take your first attendance to see activity here
                </p>
                <Link to="/attendance">
                  <Button variant="outline" size="sm">
                    Take Attendance
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {session.classes?.name} {session.classes?.section && `- ${session.classes.section}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === "completed"
                          ? "bg-success/10 text-success"
                          : session.status === "processing"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Getting Started (show if no classes) */}
        {stats.totalClasses === 0 && (
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Get started with SmartAttend
              </h2>
              <p className="text-muted-foreground mb-6">
                Set up your first class to start taking AI-powered attendance. 
                It only takes a few minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/classes">
                  <Button variant="gradient" size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Your First Class
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
