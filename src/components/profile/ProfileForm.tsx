import { useState } from "react";
import { User } from "@/types/auth.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileUpdateRequest } from "@/services/profile.service";
import {
  Loader2,
  User as UserIcon,
  Mail,
  GraduationCap,
  Save,
  Building,
  BookOpen,
  School,
  RefreshCw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileFormProps {
  user: User;
  onSubmit: (data: ProfileUpdateRequest) => void;
  isSubmitting: boolean;
}

const ProfileForm = ({ user, onSubmit, isSubmitting }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileUpdateRequest>({
    name: user.name,
    email: user.email,
    fakultas: user.fakultas === "Not specified" ? "" : user.fakultas,
  });

  const handleChange = (field: keyof ProfileUpdateRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormChanged =
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.fakultas !==
      (user.fakultas === "Not specified" ? "" : user.fakultas);

  return (
    <Card className="border-border/40 shadow-md overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              <UserIcon className="h-5 w-5 mr-2 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription className="mt-1.5">
              Manage your personal information and preferences
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Academic</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="general"
              className="space-y-6 animate-in fade-in-50"
            >
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="flex items-center text-sm font-medium"
                >
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="border-input/50 focus-visible:ring-primary/40 transition-all"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="flex items-center text-sm font-medium"
                >
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="border-input/50 focus-visible:ring-primary/40 transition-all"
                />
              </div>
            </TabsContent>

            <TabsContent
              value="academic"
              className="space-y-6 animate-in fade-in-50"
            >
              <div className="space-y-3">
                <Label
                  htmlFor="fakultas"
                  className="flex items-center text-sm font-medium"
                >
                  <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                  Faculty
                </Label>
                <Select
                  value={formData.fakultas}
                  onValueChange={(value) => handleChange("fakultas", value)}
                >
                  <SelectTrigger
                    id="fakultas"
                    className="border-input/50 focus-visible:ring-primary/40 w-full transition-all"
                  >
                    <SelectValue placeholder="Select your faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Science & Technology</SelectLabel>
                      <SelectItem
                        value="Fakultas Ilmu Komputer"
                        className="flex items-center"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                          Fakultas Ilmu Komputer
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Matematika dan Ilmu Pengetahuan Alam">
                        <div className="flex items-center">
                          <School className="h-4 w-4 mr-2 text-green-500" />
                          Fakultas Matematika dan Ilmu Pengetahuan Alam
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Teknik">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-amber-500" />
                          Fakultas Teknik
                        </div>
                      </SelectItem>
                    </SelectGroup>
                    <Separator className="my-2" />
                    <SelectGroup>
                      <SelectLabel>Humanities & Social Sciences</SelectLabel>
                      <SelectItem value="Fakultas Ekonomi dan Bisnis">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                          Fakultas Ekonomi dan Bisnis
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Ilmu Budaya">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-red-500" />
                          Fakultas Ilmu Budaya
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Hukum">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-indigo-500" />
                          Fakultas Hukum
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Ilmu Sosial dan Politik">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-cyan-500" />
                          Fakultas Ilmu Sosial dan Politik
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Psikologi">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-pink-500" />
                          Fakultas Psikologi
                        </div>
                      </SelectItem>
                    </SelectGroup>
                    <Separator className="my-2" />
                    <SelectGroup>
                      <SelectLabel>Medical & Health Sciences</SelectLabel>
                      <SelectItem value="Fakultas Kesehatan Masyarakat">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-teal-500" />
                          Fakultas Kesehatan Masyarakat
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Kedokteran">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                          Fakultas Kedokteran
                        </div>
                      </SelectItem>
                      <SelectItem value="Fakultas Kedokteran Gigi">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-emerald-500" />
                          Fakultas Kedokteran Gigi
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Selecting your faculty helps us personalize your learning
                  experience
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="flex justify-between py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting || !isFormChanged}
                    onClick={() => {
                      setFormData({
                        name: user.name,
                        email: user.email,
                        fakultas:
                          user.fakultas === "Not specified"
                            ? ""
                            : user.fakultas,
                      });
                    }}
                    className="border-gray-200"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset form to original values</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="submit"
            disabled={isSubmitting || !isFormChanged}
            className="relative overflow-hidden group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Save Changes
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
