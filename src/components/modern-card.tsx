// import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";
// import React from "react";
// import { Button } from "./ui/button";
// import { CardContent } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { CardItem, IUser } from "@/app/store/types/user-type";
// import Link from "next/link";

// const ModernCard = ({
//   me,
//   card,
//   idx,
//   onEdit,
// }: {
//   me: IUser;
//   card: CardItem;
//   idx: number;
//   onEdit: () => void;
// }) => {
//   return (
//     <div className="mt-10 w-full max-w-md mx-auto p-4">
//       <div className="grid grid-cols-1 gap-6">
//         <div key={idx}>
//           <div className="bg-slate-800 border-slate-700 shadow-2xl rounded-2xl relative">
//             <Button
//               variant="outline"
//               size="sm"
//               className="absolute top-4 right-4 bg-white text-purple-700 border "
//               onClick={onEdit}
//             >
//               Edit
//             </Button>
//             <CardContent className="p-0">
//               {/* Header Section */}
//               <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 relative overflow-hidden rounded-t-2xl">
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
//                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
//                 <div className="relative z-10">
//                   <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
//                     <AvatarImage
//                       src={me?.data?.avatar}
//                       alt={me?.data?.user_name}
//                     />
//                     <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                       {me?.data?.user_name}
//                     </AvatarFallback>
//                   </Avatar>
//                   <h1 className="text-2xl font-bold text-white mb-1">
//                     {me?.data?.full_name}
//                   </h1>
//                   <p className="text-cyan-100 font-medium">{card.job}</p>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6 space-y-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
//                   <span className="text-cyan-400 text-sm font-medium">
//                     {card.company || "N/A"}
//                   </span>
//                 </div>

//                 <p className="text-slate-300 text-sm leading-relaxed">
//                   {card.bio || "No bio provided."}
//                 </p>

//                 {/* Contact Grid */}
//                 <div className="grid grid-cols-2 gap-3 py-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-3 h-3 text-cyan-400" />
//                       <span className="text-xs text-slate-400">Phone</span>
//                     </div>
//                     <p className="text-sm text-white font-mono">{card.phone}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Mail className="w-3 h-3 text-cyan-400" />
//                       <span className="text-xs text-slate-400">Email</span>
//                     </div>
//                     <p className="text-sm text-white break-all">
//                       {me?.data?.email}
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Globe className="w-3 h-3 text-cyan-400" />
//                       <span className="text-xs text-slate-400">Website</span>
//                     </div>
//                     <p className="text-sm text-white">{card.web_site}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="w-3 h-3 text-cyan-400" />
//                       <span className="text-xs text-slate-400">Location</span>
//                     </div>
//                     <p className="text-sm text-white">{card.address}</p>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="space-y-3 pt-4">
//                   <Button
//                     onClick={async () => {
//                       const toBase64 = async (url: string) => {
//                         const response = await fetch(url);
//                         const blob = await response.blob();
//                         return new Promise<string>((resolve, reject) => {
//                           const reader = new FileReader();
//                           reader.onloadend = () =>
//                             resolve(
//                               reader.result?.toString().split(",")[1] || ""
//                             );
//                           reader.onerror = reject;
//                           reader.readAsDataURL(blob);
//                         });
//                       };

//                       const avatarBase64 = me?.data.avatar
//                         ? await toBase64(me?.data.avatar)
//                         : "";

//                       const vcard = [
//                         "BEGIN:VCARD",
//                         "VERSION:3.0",
//                         `FN:${me?.data.full_name}`,
//                         `N:${me?.data.full_name};;;;`,
//                         `ORG:${card.company}`,
//                         `TITLE:${card.job}`,
//                         `TEL;TYPE=WORK,VOICE:${card.phone}`,
//                         `EMAIL;TYPE=PREF,INTERNET:${me?.data.email}`,
//                         avatarBase64
//                           ? `PHOTO;ENCODING=b;TYPE=JPEG:${avatarBase64}`
//                           : "",
//                         `URL:${card.web_site}`,
//                         `ADR;TYPE=WORK:;;${card.address};;;;`,
//                         `NOTE:${card.bio}`,
//                         "END:VCARD",
//                       ]
//                         .filter(Boolean)
//                         .join("\r\n");

//                       const blob = new Blob([vcard], {
//                         type: "text/vcard;charset=utf-8",
//                       });

//                       const url = window.URL.createObjectURL(blob);
//                       const link = document.createElement("a");
//                       link.href = url;
//                       // link.download = `${me?.data.full_name.replace(
//                       //   " ",
//                       //   "_"
//                       // )}_${idx + 1}.vcf`;
//                       link.download = `${(
//                         me?.data.full_name ?? "Unnamed_User"
//                       ).replace(" ", "_")}_${idx + 1}.vcf`;

//                       document.body.appendChild(link);
//                       link.click();
//                       document.body.removeChild(link);
//                       window.URL.revokeObjectURL(url);
//                     }}
//                     className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Save Contact
//                   </Button>
//                   {card.socialLinks.map((res, idx: number) => {
//                     return (
//                       <div className="" key={idx}>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent w-full"
//                         >
//                           <Avatar className="w-6 h-6">
//                             <AvatarImage src={res.icon} alt={res.platform} />
//                             <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                               {res.platform}
//                             </AvatarFallback>
//                           </Avatar>
//                           {res.platform}
//                         </Button>
//                       </div>
//                     );
//                   })}
//                   {/* <div className="grid grid-cols-2 gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
//                     >
//                       <Linkedin className="w-3 h-3 mr-1" />
//                       LinkedIn
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
//                     >
//                       <Github className="w-3 h-3 mr-1" />
//                       GitHub
//                     </Button>
//                   </div> */}
//                 </div>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModernCard;

// components/profile-card/modern-card.tsx
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Download,
  Instagram,
  Pencil,
  Trash2 as Delete,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardItem } from "@/app/store/types/card-type";
import { IUser } from "@/app/store/types/user-type";

const ModernCard = ({
  me,
  card,
  idx,
  onEdit,
  onDelete,
}: {
  me: IUser;
  card: CardItem;
  idx: number;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card className="relative max-w-sm mx-auto bg-gradient-to-b from-indigo-700 via-purple-700 to-fuchsia-700 text-white rounded-3xl shadow-2xl">
      <Dialog>
        <DialogTrigger asChild className="backdrop-blur-sm">
          <Button className="absolute top-2 right-12 bg-purple-400 text-red-800 border border-purple-600 shadow-lg hover:bg-purple-700">
            <Delete className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this card?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-purple-600 text-white border border-purple-600 shadow-lg hover:bg-purple-700"
        onClick={onEdit}
      >
        <Pencil className="w-5 h-5" />
      </Button>

      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={me?.data?.avatar} alt={me?.data?.user_name} />
            <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {me?.data?.user_name}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{me?.data?.full_name}</h1>
          <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
            {card.job}
          </span>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm">{card.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm font-medium">
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
            <Phone className="text-yellow-300 mb-1" />
            <p>Call Me</p>
            <p>{card.phone}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
            <Mail className="text-pink-300 mb-1" />
            <p>Email Me</p>
            <p className="break-all">{me?.data?.email}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
            <Globe className="text-blue-300 mb-1" />
            <p>Visit</p>
            <p>{card.web_site}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
            <MapPin className="text-green-300 mb-1" />
            <p>Find Me</p>
            <p>{card.address}</p>
          </div>
        </div>

        {card.socialLinks && card.socialLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Social Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {card.socialLinks.map((social, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-white/10 rounded-xl"
                >
                  {social.icon && (
                    <img
                      src={social.icon}
                      alt={social.platform}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">
                      {social.platform}
                    </span>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 underline break-all text-xs truncate"
                    >
                      {social.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button className="w-full bg-gradient-to-r from-orange-300 via-pink-300 to-purple-400 text-black font-bold shadow-lg">
          <Download className="w-4 h-4 mr-2" />
          Save My Contact
        </Button>

        <div className="bg-white/10 text-center rounded-xl py-2 text-sm font-medium flex items-center justify-center gap-2">
          <Instagram className="text-orange-500 w-4 h-4" />
          Instagram
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernCard;
