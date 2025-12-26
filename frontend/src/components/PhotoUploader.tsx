import { useState, useCallback } from "react";
import { Upload, Image, X, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhotoUploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

const PhotoUploader = ({ onUpload, isProcessing }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const clearPreview = () => {
    setPreview(null);
    setFileName("");
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
          preview ? "p-4" : "p-8 md:p-12"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative animate-fade-in">
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full max-h-[400px] object-contain rounded-xl"
            />
            {!isProcessing && (
              <button
                onClick={clearPreview}
                className="absolute top-2 right-2 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Image className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
              {isProcessing && (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="h-4 w-4 processing-indicator" />
                  <span className="text-sm font-medium">Processing with AI...</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg animate-float">
                <Camera className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-lg bg-accent flex items-center justify-center shadow-md">
                <Upload className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Upload Class Photo
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Drag and drop your classroom image here, or click to browse.
                Our AI will automatically detect and identify students.
              </p>
            </div>
            <label>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileInput}
              />
              <Button variant="gradient" size="lg" className="cursor-pointer" asChild>
                <span>
                  <Upload className="h-5 w-5 mr-2" />
                  Choose Image
                </span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, WebP (Max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
