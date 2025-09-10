import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  Database,
  Calendar,
  MapPin,
  Tag,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const DataIngestion = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileTypes = [
    { name: "CSV Files", icon: FileText, accept: ".csv", color: "text-secondary" },
    { name: "JSON Data", icon: Database, accept: ".json", color: "text-primary" },
    { name: "Images", icon: Image, accept: ".jpg,.png,.tiff", color: "text-accent" },
    { name: "eDNA Sequences", icon: Database, accept: ".fasta,.fastq", color: "text-secondary" },
  ];

  const recentUploads = [
    { name: "coral_reef_survey_2024.csv", status: "completed", time: "2 min ago", size: "2.4 MB" },
    { name: "temperature_data.json", status: "processing", time: "5 min ago", size: "1.8 MB" },
    { name: "species_photos_batch1.zip", status: "failed", time: "10 min ago", size: "15.2 MB" },
    { name: "edna_samples_pacific.fasta", status: "completed", time: "15 min ago", size: "5.7 MB" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleUpload = (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success(`${file.name} uploaded successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "processing": return <Clock className="w-4 h-4 text-primary" />;
      case "failed": return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Data Ingestion Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload and process marine research data with automated metadata tagging and validation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <Card className="lg:col-span-2 shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-secondary" />
                File Upload
              </CardTitle>
              <CardDescription>
                Drag and drop files or click to browse. Supported formats: CSV, JSON, Images, FASTA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                  dragActive 
                    ? "border-secondary bg-secondary/10" 
                    : "border-muted-foreground/30 hover:border-secondary"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-muted-foreground mb-4">Maximum file size: 100MB</p>
                <Button variant="ocean">
                  Select Files
                </Button>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* File Type Support */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fileTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <Icon className={`w-5 h-5 ${type.color}`} />
                      <div>
                        <p className="text-sm font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground">{type.accept}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Metadata Form */}
          <Card className="shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-secondary" />
                Metadata Tagging
              </CardTitle>
              <CardDescription>
                Add context to your data uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Collection Date</Label>
                <Input type="date" id="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g., Great Barrier Reef" 
                  className="flex items-center gap-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parameter">Parameter Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parameter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Ocean Temperature</SelectItem>
                    <SelectItem value="salinity">Salinity</SelectItem>
                    <SelectItem value="biodiversity">Species Survey</SelectItem>
                    <SelectItem value="edna">eDNA Sequences</SelectItem>
                    <SelectItem value="water-quality">Water Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="depth">Depth (meters)</Label>
                <Input id="depth" type="number" placeholder="0-1000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Research Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Additional context, methodology, or observations..."
                  rows={3}
                />
              </div>

              <Button variant="surface" className="w-full">
                Save Metadata
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Uploads */}
        <Card className="shadow-ocean">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Track your data ingestion progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(upload.status)}
                    <div>
                      <p className="font-medium">{upload.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {upload.size} • {upload.time}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={upload.status === "completed" ? "secondary" : upload.status === "failed" ? "destructive" : "outline"}
                  >
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataIngestion;