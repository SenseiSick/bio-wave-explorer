import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Map, 
  Thermometer,
  Waves,
  Fish,
  Activity,
  Calendar,
  Download,
  Settings
} from "lucide-react";

const Visualization = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Mock data for charts
  const temperatureData = [
    { month: "Jan", temp: 16.2, salinity: 35.1 },
    { month: "Feb", temp: 16.8, salinity: 35.3 },
    { month: "Mar", temp: 17.5, salinity: 35.0 },
    { month: "Apr", temp: 18.1, salinity: 34.9 },
    { month: "May", temp: 19.2, salinity: 34.8 },
    { month: "Jun", temp: 20.1, salinity: 34.7 },
  ];

  const speciesData = [
    { species: "Coral Trout", count: 234, trend: "up" },
    { species: "Parrotfish", count: 189, trend: "down" },
    { species: "Angelfish", count: 156, trend: "up" },
    { species: "Grouper", count: 98, trend: "stable" },
    { species: "Butterflyfish", count: 87, trend: "up" },
  ];

  const locations = [
    { name: "Great Barrier Reef", temp: "18.3°C", species: 342, status: "healthy" },
    { name: "Coral Triangle", temp: "24.1°C", species: 456, status: "monitoring" },
    { name: "Galápagos", temp: "19.7°C", species: 289, status: "healthy" },
    { name: "Mediterranean", temp: "17.8°C", species: 198, status: "concern" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-secondary" />;
      case "down": return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-secondary/20 text-secondary";
      case "monitoring": return "bg-primary/20 text-primary";
      case "concern": return "bg-destructive/20 text-destructive";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Ocean Analytics</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Interactive visualizations of marine biodiversity and oceanographic data
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-ocean">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                  <Thermometer className="w-4 h-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.7°C</div>
                  <p className="text-xs text-muted-foreground">+0.3°C from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-ocean">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Species Count</CardTitle>
                  <Fish className="w-4 h-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,289</div>
                  <p className="text-xs text-muted-foreground">+47 this month</p>
                </CardContent>
              </Card>

              <Card className="shadow-ocean">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
                  <Map className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">12 new sites</p>
                </CardContent>
              </Card>

              <Card className="shadow-ocean">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                  <Activity className="w-4 h-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">+2% improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Temperature Trend Mock Chart */}
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  Ocean Temperature Trends
                </CardTitle>
                <CardDescription>Monthly average temperatures across monitoring sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-b from-secondary/10 to-primary/5 rounded-lg flex items-end justify-around p-4">
                  {temperatureData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-gradient-ocean rounded-t-lg w-8 transition-smooth hover:shadow-glow"
                        style={{ height: `${(data.temp / 25) * 200}px` }}
                      />
                      <p className="text-xs text-muted-foreground">{data.month}</p>
                      <p className="text-xs font-medium">{data.temp}°C</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="temperature" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-accent" />
                  Temperature & Salinity Analysis
                </CardTitle>
                <CardDescription>Correlation between temperature and salinity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Waves className="w-16 h-16 text-secondary mx-auto" />
                    <p className="text-lg font-medium">Interactive Temperature Map</p>
                    <p className="text-muted-foreground">Heat map showing temperature variations across ocean regions</p>
                    <Button variant="ocean">View Interactive Map</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-secondary" />
                  Species Distribution
                </CardTitle>
                <CardDescription>Top species by observation count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {speciesData.map((species, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span className="font-medium">{species.species}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{species.count}</span>
                        {getTrendIcon(species.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Research Locations
            </CardTitle>
                <CardDescription>Status and metrics for active monitoring sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.map((location, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{location.name}</h3>
                        <Badge className={getStatusColor(location.status)}>
                          {location.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Temperature</p>
                          <p className="font-medium">{location.temp}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Species</p>
                          <p className="font-medium">{location.species}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Visualization;