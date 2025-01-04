import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || "", 
    email: user?.email || "", 
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || [],
    file: user?.profile?.resume || null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    // api call
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here. Click "Save changes"
            when done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="fullName"
              className="col-span-4"
              value={input.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="col-span-4"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              name="phoneNumber"
              className="col-span-4"
              value={input.phoneNumber}
              onChange={handleChange}
              minLength={10}
              maxLength={10}

            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              className="col-span-4"
              value={input.bio}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              className="col-span-4"
              value={input.skills}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume
            </Label>
            <Input
              type="file"
              id="resume"
              name="file"
              accept="application/pdf"
              className="col-span-4"
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" className="bg-sky-700 hover:bg-sky-900">
              {loading ? (
                <div className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /><span className="ml-2">Please wait</span></div>
                
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
