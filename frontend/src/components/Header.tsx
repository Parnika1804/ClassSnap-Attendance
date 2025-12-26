import { Camera, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-md">
            <Camera className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">ClassSnap</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Attendance</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-4">
          <a 
            href="#" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Documentation</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
