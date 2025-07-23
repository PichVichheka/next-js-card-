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
