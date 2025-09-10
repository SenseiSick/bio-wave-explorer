import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Fish, 
  Search, 
  Filter,
  Eye,
  Download,
  BookOpen,
  MapPin,
  Ruler,
  Camera
} from "lucide-react";

const Fisheries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("all");

  const speciesDatabase = [
    {
      id: 1,
      name: "Epinephelus malabaricus",
      commonName: "Malabar Grouper",
      family: "Serranidae",
      status: "Near Threatened",
      length: "60-200cm",
      habitat: "Coral reefs, rocky bottoms",
      depth: "10-150m",
      images: 3,
      otoliths: 12
    },
    {
      id: 2,
      name: "Scarus coeruleus",
      commonName: "Blue Parrotfish",
      family: "Scaridae", 
      status: "Least Concern",
      length: "30-120cm",
      habitat: "Coral reefs, seagrass beds",
      depth: "3-25m",
      images: 8,
      otoliths: 25
    },
    {
      id: 3,
      name: "Pomacanthus imperator",
      commonName: "Emperor Angelfish",
      family: "Pomacanthidae",
      status: "Least Concern", 
      length: "38-40cm",
      habitat: "Coral reefs, lagoons",
      depth: "1-100m",
      images: 15,
      otoliths: 18
    },
    {
      id: 4,
      name: "Chaetodon auriga",
      commonName: "Threadfin Butterflyfish",
      family: "Chaetodontidae",
      status: "Least Concern",
      length: "20-23cm", 
      habitat: "Coral reefs",
      depth: "1-35m",
      images: 6,
      otoliths: 9
    }
  ];

  const taxonomicHierarchy = [
    { level: "Kingdom", name: "Animalia", count: 1 },
    { level: "Phylum", name: "Chordata", count: 1 },
    { level: "Class", name: "Actinopterygii", count: 1 },
    { level: "Order", name: "Perciformes", count: 1 },
    { level: "Family", name: "Multiple", count: 4 },
    { level: "Genus", name: "Multiple", count: 4 },
    { level: "Species", name: "4 documented", count: 4 }
  ];

  const otolithSamples = [
    { id: 1, species: "Malabar Grouper", age: "3 years", length: "45cm", location: "Great Barrier Reef" },
    { id: 2, species: "Blue Parrotfish", age: "5 years", length: "78cm", location: "Coral Triangle" },
    { id: 3, species: "Emperor Angelfish", age: "2 years", length: "32cm", location: "Red Sea" },
    { id: 4, species: "Threadfin Butterflyfish", age: "1 year", length: "18cm", location: "Caribbean" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Least Concern": return "bg-secondary/20 text-secondary";
      case "Near Threatened": return "bg-primary/20 text-primary";
      case "Vulnerable": return "bg-destructive/20 text-destructive";
      default: return "";
    }
  };

  const filteredSpecies = speciesDatabase.filter(species =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    species.commonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Fisheries & Taxonomy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive species database with taxonomic classification and otolith analysis
          </p>
        </div>

        <Tabs defaultValue="species" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="species">Species Database</TabsTrigger>
            <TabsTrigger value="taxonomy">Taxonomy Browser</TabsTrigger>
            <TabsTrigger value="otoliths">Otolith Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="species" className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-secondary" />
                  Species Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by scientific or common name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="ocean">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Species Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSpecies.map((species) => (
                <Card key={species.id} className="shadow-ocean hover:shadow-glow transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg italic">{species.name}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">
                          {species.commonName}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(species.status)}>
                        {species.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Family</p>
                        <p className="font-medium">{species.family}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Length</p>
                        <p className="font-medium">{species.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Habitat</p>
                        <p className="font-medium">{species.habitat}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Depth</p>
                        <p className="font-medium">{species.depth}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {species.images} images
                        </span>
                        <span className="flex items-center gap-1">
                          <Fish className="w-3 h-3" />
                          {species.otoliths} otoliths
                        </span>
                      </div>
                      <Button variant="surface" size="sm">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  Taxonomic Classification
                </CardTitle>
                <CardDescription>
                  Hierarchical classification of documented marine species
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxonomicHierarchy.map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{level.level}</p>
                          <p className="text-sm text-muted-foreground italic">{level.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{level.count} taxa</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="otoliths" className="space-y-6">
            <Card className="shadow-ocean">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-secondary" />
                  Otolith Collection
                </CardTitle>
                <CardDescription>
                  Age and growth analysis through otolith examination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otolithSamples.map((sample) => (
                    <div key={sample.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{sample.species}</h3>
                        <Badge variant="outline">{sample.age}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Length</p>
                          <p className="font-medium flex items-center gap-1">
                            <Ruler className="w-3 h-3" />
                            {sample.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {sample.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="surface" size="sm" className="flex-1">
                          <Eye className="w-3 h-3" />
                          View Images
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
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

export default Fisheries;