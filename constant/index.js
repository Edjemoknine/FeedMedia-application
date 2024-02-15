import { Home, ImagePlus, Users, UserCheck } from "lucide-react";

export const menuLinks = [
  {
    icon: <Home className="text-white " size={30} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <ImagePlus className="text-white " size={30} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <Users className="text-white " size={30} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <UserCheck className="text-white " size={30} />,
    route: "/edit-post",
    label: "Edite Profile",
  },
];

export const pageTitles = [
  { url: "/", title: "Feed" },
  { url: "/edit-profile", title: "Edit Profile" },
  { url: "/create-post", title: "Create Post" },
  { url: "/edit-post", title: "Edit post" },
  { url: "/search", title: "Seach" },
];
