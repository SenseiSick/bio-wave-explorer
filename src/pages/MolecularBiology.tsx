import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dna, 
  Upload, 
  Search,
  Database,
  Microscope,
  BarChart3,
  Download,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

const MolecularBiology = () => {
  const [sequenceInput, setSequenceInput] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const ednaSamples = [
    {
      id: "EDN001",
      location: "Great Barrier Reef - Site A", 
      date: "2024-01-15",
      sequences: 1247,
      species: 89,
      status: "completed",
      quality: 94
    },
    {
      id: "EDN002", 
      location: "Coral Triangle - Deep",
      date: "2024-01-18",
      sequences: 892,
      species: 67,
      status: "processing",
      quality: 87
    },
    {
      id: "EDN003",
      location: "Mediterranean - Coast",
      date: "2024-01-20", 
      sequences: 1567,
      species: 112,
      status: "completed",
      quality: 91
    },
    {
      id: "EDN004",
      location: "Caribbean - Reef System", 
      date: "2024-01-22",
      sequences: 743,
      species: 45,
      status: "failed",
      quality: 62
    }
  ];

  const speciesMatches = [
    {
      species: "Acanthurus coeruleus",
      commonName: "Blue Tang",
      confidence: 98.7,
      sequences: 23,
      coverage: "Complete"
    },
    {
      species: "Epinephelus striatus", 
      commonName: "Nassau Grouper",
      confidence: 95.3,
      sequences: 18,
      coverage: "Partial"
    },
    {
      species: "Scarus vetula",
      commonName: "Queen Parrotfish", 
      confidence: 92.1,
      sequences: 15,
      coverage: "Complete"
    },
    {
      species: "Pomacanthus paru",
      commonName: "French Angelfish",
      confidence: 89.4, 
      sequences: 12,
      coverage: "Partial"
    }
  ];

  const biodiversityInsights = [
    { metric: "Shannon Diversity Index", value: "3.47", interpretation: "High diversity" },
    { metric: "Species Richness", value: "89", interpretation: "Very rich community" },
    { metric: "Evenness", value: "0.82", interpretation: "Well balanced" },
    { metric: "Rare Species", value: "12", interpretation: "Notable endemics" }
  ];

  const runSequenceAnalysis = () => {
    if (!sequenceInput.trim()) {
      toast.error("Please enter a DNA sequence to analyze");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast.success("Sequence analysis completed!");
          return 100;
        }
        return prev + 15;
      });
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "processing": return <Clock className="w-4 h-4 text-primary" />;
      case "failed": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-secondary";
    if (confidence >= 85) return "text-primary";
    return "text-accent";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Molecular Biology Lab</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Environmental DNA sequencing and species identification for marine biodiversity assessment
          </p>
        </div>

        <Tabs defaultValue="sequences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sequences">eDNA Sequences</TabsTrigger>
            <TabsTrigger value="analysis">Sequence Analysis</TabsTrigger>
            <TabsTrigger value="matching">Species Matching</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="sequences" className="space-y-6">
            {/* Upload Interface */}
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-secondary" />
                  eDNA Sequence Upload
                </CardTitle>
                <CardDescription>
                  Upload FASTA or FASTQ files for species identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-secondary transition-smooth">
                  <Dna className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Upload eDNA sequence files</p>
                  <p className="text-muted-foreground mb-4">Supports FASTA, FASTQ formats up to 500MB</p>
                  <Button variant="ocean">
                    <Upload className="w-4 h-4" />
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample History */}
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-secondary" />
                  eDNA Sample Database
                </CardTitle>
                <CardDescription>Recently processed environmental DNA samples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ednaSamples.map((sample) => (
                    <div key={sample.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(sample.status)}
                        <div>
                          <p className="font-medium">{sample.id}</p>
                          <p className="text-sm text-muted-foreground">{sample.location}</p>
                          <p className="text-xs text-muted-foreground">{sample.date}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex gap-4 text-sm">
                          <span>{sample.sequences} sequences</span>
                          <span>{sample.species} species</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Quality:</span>
                          <Badge variant={sample.quality >= 90 ? "secondary" : "outline"}>
                            {sample.quality}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-secondary" />
                  Sequence Analysis Tool
                </CardTitle>
                <CardDescription>
                  Paste DNA sequences for real-time analysis and species identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">DNA Sequence (FASTA format)</label>
                  <Textarea
                    placeholder=">Sample_sequence_1&#10;ATGCGTACGTAGCTAGCTAGCTAGCTAGCTAGC..."
                    value={sequenceInput}
                    onChange={(e) => setSequenceInput(e.target.value)}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing sequence...</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    variant="ocean" 
                    onClick={runSequenceAnalysis}
                    disabled={isAnalyzing}
                  >
                    <Play className="w-4 h-4" />
                    {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                  </Button>
                  <Button variant="outline">
                    <Search className="w-4 h-4" />
                    BLAST Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  Species Identification Results
                </CardTitle>
                <CardDescription>
                  Top species matches from sequence database comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {speciesMatches.map((match, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium italic">{match.species}</h3>
                          <p className="text-sm text-muted-foreground">{match.commonName}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getConfidenceColor(match.confidence)}`}>
                            {match.confidence}%
                          </p>
                          <p className="text-xs text-muted-foreground">confidence</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Sequences</p>
                          <p className="font-medium">{match.sequences} matches</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Coverage</p>
                          <Badge variant={match.coverage === "Complete" ? "secondary" : "outline"}>
                            {match.coverage}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="w-5 h-5 text-secondary" />
                  Biodiversity Assessment
                </CardTitle>
                <CardDescription>
                  Species-level diversity insights from eDNA analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {biodiversityInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-2">
                      <h3 className="font-medium">{insight.metric}</h3>
                      <p className="text-3xl font-bold text-secondary">{insight.value}</p>
                      <p className="text-sm text-muted-foreground">{insight.interpretation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle>Community Composition</CardTitle>
                <CardDescription>Species abundance visualization from eDNA data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart3 className="w-16 h-16 text-secondary mx-auto" />
                    <p className="text-lg font-medium">Interactive Diversity Chart</p>
                    <p className="text-muted-foreground">Species composition and abundance data</p>
                    <Button variant="ocean">
                      <Download className="w-4 h-4" />
                      Export Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MolecularBiology;