import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Fish, 
  Waves, 
  Thermometer, 
  Upload,
  BarChart3,
  Users,
  TrendingUp,
  MapPin
} from "lucide-react";
import oceanHero from "@/assets/ocean-hero.jpg";

const Dashboard = () => {
  const stats = [
    { label: "Species Catalogued", value: "12,847", change: "+234", icon: Fish, color: "text-secondary" },
    { label: "Ocean Temperature", value: "18.3°C", change: "+0.2°C", icon: Thermometer, color: "text-accent" },
    { label: "Data Points", value: "2.4M", change: "+15K", icon: BarChart3, color: "text-primary" },
    { label: "Research Sites", value: "156", change: "+12", icon: MapPin, color: "text-secondary" },
  ];

  const recentData = [
    { type: "eDNA Sequence", location: "Coral Triangle", time: "2 hours ago", status: "Processing" },
    { type: "Temperature Data", location: "Great Barrier Reef", time: "4 hours ago", status: "Complete" },
    { type: "Species Survey", location: "Galápagos", time: "6 hours ago", status: "Complete" },
    { type: "Water Quality", location: "Mediterranean", time: "8 hours ago", status: "Processing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={oceanHero} 
          alt="Marine biodiversity underwater scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Marine Biodiversity Platform
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Advancing ocean research through integrated data collection, analysis, and species monitoring
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="ocean" size="lg">
                <Upload className="w-5 h-5" />
                Upload Data
              </Button>
              <Button variant="surface" size="lg">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-ocean hover:shadow-glow transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-secondary" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-secondary" />
                Recent Data Collection
              </CardTitle>
              <CardDescription>
                Latest uploads and processing status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location} • {item.time}
                    </p>
                  </div>
                  <Badge 
                    variant={item.status === "Complete" ? "secondary" : "outline"}
                    className={item.status === "Complete" ? "bg-secondary/20 text-secondary" : ""}
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-ocean">
            <CardHeader>
              <CardTitle>Research Progress</CardTitle>
              <CardDescription>Current project status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Species Classification</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>eDNA Analysis</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Integration</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="ocean" className="w-full">
                  View Full Reports
                </Button>
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;