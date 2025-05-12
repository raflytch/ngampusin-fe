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
  SelectItem,
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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <Card className="border-border/40 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <UserIcon className="h-5 w-5 mr-2 text-primary" />
          Profile Settings
        </CardTitle>
        <CardDescription>
          Manage your account details and preferences
        </CardDescription>
      </CardHeader>
      <Separator />
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>

            <TabsContent
              value="general"
              className="space-y-6 animate-in fade-in-50"
            >
              <div className="space-y-2">
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
                  className="border-input/50 focus-visible:ring-primary/40"
                />
              </div>

              <div className="space-y-2">
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
                  className="border-input/50 focus-visible:ring-primary/40"
                />
              </div>
            </TabsContent>

            <TabsContent
              value="academic"
              className="space-y-6 animate-in fade-in-50"
            >
              <div className="space-y-2">
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
                    className="border-input/50 focus-visible:ring-primary/40 w-full"
                  >
                    <SelectValue placeholder="Select your faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fakultas Ilmu Komputer">
                      Fakultas Ilmu Komputer
                    </SelectItem>
                    <SelectItem value="Fakultas Matematika dan Ilmu Pengetahuan Alam">
                      Fakultas Matematika dan Ilmu Pengetahuan Alam
                    </SelectItem>
                    <SelectItem value="Fakultas Teknik">
                      Fakultas Teknik
                    </SelectItem>
                    <SelectItem value="Fakultas Ekonomi dan Bisnis">
                      Fakultas Ekonomi dan Bisnis
                    </SelectItem>
                    <SelectItem value="Fakultas Ilmu Budaya">
                      Fakultas Ilmu Budaya
                    </SelectItem>
                    <SelectItem value="Fakultas Kesehatan Masyarakat">
                      Fakultas Kesehatan Masyarakat
                    </SelectItem>
                    <SelectItem value="Fakultas Kedokteran">
                      Fakultas Kedokteran
                    </SelectItem>
                    <SelectItem value="Fakultas Kedokteran Gigi">
                      Fakultas Kedokteran Gigi
                    </SelectItem>
                    <SelectItem value="Fakultas Hukum">
                      Fakultas Hukum
                    </SelectItem>
                    <SelectItem value="Fakultas Ilmu Sosial dan Politik">
                      Fakultas Ilmu Sosial dan Politik
                    </SelectItem>
                    <SelectItem value="Fakultas Psikologi">
                      Fakultas Psikologi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="flex justify-between pt-4">
          <Button
            type="button"
            variant="ghost"
            disabled={isSubmitting}
            onClick={() => {
              setFormData({
                name: user.name,
                email: user.email,
                fakultas:
                  user.fakultas === "Not specified" ? "" : user.fakultas,
              });
            }}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
