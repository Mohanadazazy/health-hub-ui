import { useState } from "react";
import {
  Upload,
  X,
  FileText,
  Camera,
  Image,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const nearbyPharmacies = [
  {
    id: "1",
    name: "HealthFirst Pharmacy",
    distance: "0.5 km",
    rating: 4.8,
    availability: "All medicines available",
    price: 45.99,
    estimatedTime: "30 mins",
  },
  {
    id: "2",
    name: "MediCare Plus",
    distance: "1.2 km",
    rating: 4.6,
    availability: "2 of 3 medicines available",
    price: 42.50,
    estimatedTime: "45 mins",
  },
  {
    id: "3",
    name: "QuickMeds Pharmacy",
    distance: "1.8 km",
    rating: 4.5,
    availability: "All medicines available",
    price: 48.00,
    estimatedTime: "1 hour",
  },
];

type Step = "upload" | "processing" | "results";

const Prescription = () => {
  const [step, setStep] = useState<Step>("upload");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
    }
  };

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

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  const startProcessing = () => {
    setStep("processing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("results"), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUpload = () => {
    setStep("upload");
    setUploadedFile(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Upload Prescription
              </h1>
              <p className="text-muted-foreground">
                Upload your prescription and find the best pharmacies near you
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[
                { key: "upload", label: "Upload" },
                { key: "processing", label: "Processing" },
                { key: "results", label: "Results" },
              ].map((s, index) => (
                <div key={s.key} className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full font-semibold transition-colors ${
                      step === s.key
                        ? "bg-primary text-primary-foreground"
                        : ["processing", "results"].includes(step) &&
                          index <
                            ["upload", "processing", "results"].indexOf(step)
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {["processing", "results"].includes(step) &&
                    index < ["upload", "processing", "results"].indexOf(step) ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`ml-2 font-medium hidden sm:block ${
                      step === s.key ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {index < 2 && (
                    <div className="w-12 h-0.5 mx-4 bg-muted">
                      <div
                        className={`h-full bg-primary transition-all ${
                          ["processing", "results"].includes(step) &&
                          index <
                            ["upload", "processing", "results"].indexOf(step)
                            ? "w-full"
                            : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Upload Step */}
            {step === "upload" && (
              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`bg-card rounded-2xl border-2 border-dashed transition-colors ${
                    dragActive
                      ? "border-primary bg-primary-light"
                      : uploadedFile
                      ? "border-success"
                      : "border-border"
                  } p-8`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="relative">
                      <img
                        src={uploadedFile}
                        alt="Prescription"
                        className="max-h-96 mx-auto rounded-xl shadow-card"
                      />
                      <button
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                        onClick={() => setUploadedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <Badge className="absolute bottom-2 left-2 bg-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Image uploaded
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="h-16 w-16 mx-auto rounded-full bg-primary-light flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Drag and drop your prescription
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        or click to browse from your device
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <label>
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Image className="h-4 w-4 mr-2" />
                              Upload Image
                            </span>
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                        <label>
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <Camera className="h-4 w-4 mr-2" />
                              Take Photo
                            </span>
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Guidelines */}
                <div className="bg-muted/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Prescription Guidelines
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {[
                      "Upload a clear, readable image",
                      "Include the full prescription",
                      "Ensure doctor's signature is visible",
                      "Make sure the date is legible",
                      "Prescription must be valid (not expired)",
                      "Accepted formats: JPG, PNG, PDF",
                    ].map((guideline) => (
                      <li key={guideline} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={!uploadedFile}
                  onClick={startProcessing}
                >
                  <FileText className="h-5 w-5" />
                  Process Prescription
                </Button>
              </div>
            )}

            {/* Processing Step */}
            {step === "processing" && (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-primary-light flex items-center justify-center mb-6">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Processing Your Prescription
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're analyzing your prescription and finding the best pharmacies...
                </p>
                <div className="max-w-md mx-auto space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{progress}% complete</p>
                </div>
              </div>
            )}

            {/* Results Step */}
            {step === "results" && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-success/10 border border-success/20 rounded-2xl p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-success flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Prescription Processed Successfully!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We found 3 medicines in your prescription. Here are the nearest
                      pharmacies that can fulfill your order.
                    </p>
                  </div>
                </div>

                {/* Extracted Medicines */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Medicines Found
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Amoxicillin 500mg",
                      "Ibuprofen 400mg",
                      "Vitamin B Complex",
                    ].map((med) => (
                      <Badge key={med} variant="secondary" className="py-2 px-3">
                        {med}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pharmacy Results */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">
                    Available Pharmacies
                  </h4>
                  <div className="space-y-4">
                    {nearbyPharmacies.map((pharmacy, index) => (
                      <div
                        key={pharmacy.id}
                        className={`bg-card rounded-2xl border p-6 transition-all hover:shadow-card ${
                          index === 0 ? "border-primary ring-2 ring-primary/20" : "border-border"
                        }`}
                      >
                        {index === 0 && (
                          <Badge className="bg-primary mb-4">Best Match</Badge>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <h5 className="font-semibold text-lg text-foreground">
                              {pharmacy.name}
                            </h5>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {pharmacy.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-warning fill-warning" />
                                {pharmacy.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {pharmacy.estimatedTime}
                              </span>
                            </div>
                            <p
                              className={`text-sm ${
                                pharmacy.availability.includes("All")
                                  ? "text-success"
                                  : "text-warning"
                              }`}
                            >
                              {pharmacy.availability}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                ${pharmacy.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Total price
                              </p>
                            </div>
                            <Button>
                              Order Now
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Another */}
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={resetUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Another Prescription
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prescription;
