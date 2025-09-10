import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  MapPin,
  Thermometer,
  Fish,
  AlertTriangle,
  CheckCircle,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const correlationInsights = [
    {
      id: 1,
      title: "Temperature Impact on Coral Species",
      correlation: 0.87,
      significance: "High",
      summary: "Rising water temperatures show strong negative correlation with coral diversity in shallow reef systems.",
      trend: "declining",
      confidence: 94
    },
    {
      id: 2, 
      title: "Parrotfish Distribution vs. Reef Health",
      correlation: 0.73,
      significance: "Moderate",
      summary: "Healthy parrotfish populations correlate with improved coral recruitment and algae control.",
      trend: "stable",
      confidence: 88
    },
    {
      id: 3,
      title: "eDNA Diversity and Water Quality",
      correlation: 0.91,
      significance: "High", 
      summary: "Environmental DNA diversity directly correlates with water quality parameters across sites.",
      trend: "improving",
      confidence: 96
    },
    {
      id: 4,
      title: "Seasonal Migration Patterns",
      correlation: 0.68,
      significance: "Moderate",
      summary: "Migratory species show consistent seasonal patterns influenced by temperature gradients.", 
      trend: "stable",
      confidence: 82
    }
  ];

  const recentReports = [
    {
      id: "RPT-2024-001",
      title: "Great Barrier Reef Biodiversity Assessment Q1 2024",
      type: "Quarterly Report",
      date: "2024-01-31",
      status: "completed",
      pages: 47,
      insights: 12
    },
    {
      id: "RPT-2024-002", 
      title: "Coral Triangle eDNA Analysis - January 2024",
      type: "Research Report",
      date: "2024-01-28",
      status: "completed", 
      pages: 23,
      insights: 8
    },
    {
      id: "RPT-2024-003",
      title: "Mediterranean Temperature Trends 2023-2024",
      type: "Climate Analysis",
      date: "2024-01-25",
      status: "processing",
      pages: 35,
      insights: 15
    },
    {
      id: "RPT-2024-004",
      title: "Caribbean Fisheries Impact Assessment", 
      type: "Impact Study",
      date: "2024-01-22",
      status: "draft",
      pages: 28,
      insights: 9
    }
  ];

  const keyMetrics = [
    { label: "Species Analyzed", value: "2,847", change: "+234", trend: "up" },
    { label: "Research Sites", value: "156", change: "+12", trend: "up" },
    { label: "Temperature Alerts", value: "23", change: "-5", trend: "down" },
    { label: "Biodiversity Score", value: "87%", change: "+3%", trend: "up" }
  ];

  const generateReport = () => {
    toast.success("Generating comprehensive marine biodiversity report...");
    // Simulate report generation
    setTimeout(() => {
      toast.success("Report generated successfully! Ready for download.");
    }, 3000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
      case "up": 
        return <TrendingUp className="w-4 h-4 text-secondary" />;
      case "declining":
      case "down": 
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: 
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": 
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "processing": 
        return <Activity className="w-4 h-4 text-primary animate-spin" />;
      case "draft": 
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      default: 
        return <FileText className="w-4 h-4" />;
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "High": return "text-secondary";
      case "Moderate": return "text-primary";
      case "Low": return "text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Insights & Reports</h1>
            <p className="text-xl text-muted-foreground mt-2">
              AI-driven analysis and comprehensive reporting for marine research
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ocean" onClick={generateReport}>
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="shadow-ocean hover:shadow-glow transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                {getTrendIcon(metric.trend)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="reports">Report Library</TabsTrigger>
            <TabsTrigger value="analytics">Custom Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-secondary" />
                  AI-Driven Correlations
                </CardTitle>
                <CardDescription>
                  Machine learning insights from integrated oceanographic and biodiversity data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {correlationInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground">{insight.summary}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(insight.trend)}
                          <Badge className={getSignificanceColor(insight.significance)}>
                            {insight.significance}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Correlation</p>
                          <p className="font-bold text-lg">{insight.correlation}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="h-2 flex-1" />
                            <span className="font-medium">{insight.confidence}%</span>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button variant="surface" size="sm">
                            <Eye className="w-3 h-3" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Report Archive
                </CardTitle>
                <CardDescription>
                  Generated reports and comprehensive analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(report.status)}
                        <div className="space-y-1">
                          <p className="font-medium">{report.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {report.date}
                            </span>
                            <Badge variant="outline">{report.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{report.pages} pages</span>
                          <span>{report.insights} insights</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="surface" size="sm">
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Custom Report Builder
                </CardTitle>
                <CardDescription>
                  Create tailored reports with specific parameters and data ranges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Report Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biodiversity">Biodiversity Assessment</SelectItem>
                          <SelectItem value="temperature">Temperature Analysis</SelectItem>
                          <SelectItem value="species">Species Distribution</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Region</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          <SelectItem value="pacific">Pacific Ocean</SelectItem>
                          <SelectItem value="atlantic">Atlantic Ocean</SelectItem>
                          <SelectItem value="indian">Indian Ocean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Time Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">Last Month</SelectItem>
                          <SelectItem value="3months">Last 3 Months</SelectItem>
                          <SelectItem value="6months">Last 6 Months</SelectItem>
                          <SelectItem value="1year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Export Format</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Report</SelectItem>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="csv">CSV Data</SelectItem>
                          <SelectItem value="json">JSON Export</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="ocean" className="flex-1">
                    <FileText className="w-4 h-4" />
                    Generate Custom Report
                  </Button>
                  <Button variant="surface">
                    <Download className="w-4 h-4" />
                    Quick Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;