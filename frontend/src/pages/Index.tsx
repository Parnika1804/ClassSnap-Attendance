import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, ArrowRight, Sparkles, Camera, FileSpreadsheet, Clock, Users } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <CameraIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-lg">ClassSnap</span>
          </div>
          <Button variant="gradient" onClick={() => navigate("/auth")}>
            Get Started <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Attendance System
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Automate Classroom
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Attendance Tracking
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload a class photo and let AI instantly identify students. 
            Save hours of manual work with smart face recognition technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" onClick={() => navigate("/auth")}>
              Start Free <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Camera, title: "Upload Photo", desc: "Take a picture of your classroom" },
              { icon: Users, title: "AI Detection", desc: "Faces are automatically recognized" },
              { icon: FileSpreadsheet, title: "Export Data", desc: "Download attendance as Excel" },
            ].map((f, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-md">
                  <f.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to save time?</h2>
          <p className="text-muted-foreground mb-8">Join teachers who are automating their attendance.</p>
          <Button variant="gradient" size="xl" onClick={() => navigate("/auth")}>
            Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ClassSnap. AI-Powered Attendance System.</p>
      </footer>
    </div>
  );
};

export default Index;
