//

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Mail, User, Edit3, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { CardItem, UserData } from "@/app/store/types/user-type";
import ModernCard from "@/components/modern-card";
import MinimalCard from "@/components/minimal-card";
import CorporateCard from "@/components/corporate-card";
import UpdateUserDialog from "@/components/update-user-dialog";
import ProfileFormForModal from "@/components/ui/ProfileFormForModal";

import { userRequest } from "@/lib/api/user-api";
import { cardRequest } from "@/lib/api/card-api";
import { toast } from "sonner";
import type { FormValues } from "@/components/update-user-dialog";

export default function Component() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCard, setEditCard] = useState<CardItem | null>(null);

  const { GET_ME, UPDATE_USER } = userRequest();
  const { CREATE_CARD, UPDATE_CARD, DELETE_CARD } = cardRequest();
  const createCardMutation = useMutation({
    mutationFn: CREATE_CARD,
  });

  const updateCardMutation = useMutation({
    mutationFn: (payload) => UPDATE_CARD(editCard?.id ?? "", payload),
  });
  const deleteCardMutation = useMutation({
    mutationFn: (cardId: string) => DELETE_CARD(cardId),
    onSuccess: () => {
      toast.success("Card deleted successfully");
      refetch(); // Refresh data after delete
    },
    onError: () => {
      toast.error("Failed to delete card");
    },
  });
  const {
    data: me,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => GET_ME(),
  });

  const handleLogout = () => {
    cookies.remove("token"); // Remove auth token cookie
    router.push("/login"); // Redirect to login page
  };

  const handleSave = async (data: FormValues) => {
    try {
      await UPDATE_USER(data);
      setOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  } else if (isError) {
    return "error";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-4 flex items-center justify-center">
        <UpdateUserDialog
          user={me?.data as UserData}
          onSave={handleSave}
          open={open}
          setOpen={setOpen}
        />
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-0">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10">
              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="absolute top-4 right-4 w-10 h-10 "
              >
                <LogOut className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={me?.data?.avatar} alt="Avatar" />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {me?.data?.user_name}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {me?.data?.full_name}
                </h1>
                <Badge variant="secondary" className="text-xs font-medium">
                  Premium Member
                </Badge>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  @{me?.data?.user_name}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{me?.data?.email}</span>
              </div>

              {/* <div className="flex justify-center gap-6 py-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">127</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">2.4K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">891</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Following
                  </div>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 space-x-1 gap-3">
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowCreateForm(true)}
                  >
                    Create Card
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Name Cards */}
      <div className="w-full max-w-md mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          {me?.data?.idCard?.map((card: CardItem, idx: number) => {
            return (
              <div key={idx}>
                {card.card_type === "Minimal" && (
                  <MinimalCard
                    me={me}
                    card={card}
                    idx={idx}
                    onEdit={() => {
                      setEditCard(card);
                      setShowEditForm(true);
                    }}
                    onDelete={() => {
                      console.log("Delete card", card.id);
                      deleteCardMutation.mutate(card.id);
                    }}
                  />
                )}
                {card.card_type === "Modern" && (
                  <ModernCard
                    me={me}
                    card={card}
                    idx={idx}
                    onEdit={() => {
                      setEditCard(card);
                      setShowEditForm(true);
                    }}
                    onDelete={() => {
                      console.log("Delete card", card.id);
                      deleteCardMutation.mutate(card.id);
                    }}
                  />
                )}
                {card.card_type === "Corporate" && (
                  <CorporateCard
                    me={me}
                    card={card}
                    idx={idx}
                    onEdit={() => {
                      setEditCard(card);
                      setShowEditForm(true);
                    }}
                    onDelete={() => {
                      console.log("Delete card", card.id);
                      deleteCardMutation.mutate(card.id);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Card Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Card</h2>
            <ProfileFormForModal
              onSuccess={() => {
                setShowCreateForm(false);
                refetch();
              }}
              mutation={createCardMutation}
              me={me}
              buttonText="Create"
            />
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {showEditForm && editCard && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Card</h2>
            <ProfileFormForModal
              onSuccess={() => {
                setShowEditForm(false);
                setEditCard(null);
                refetch();
              }}
              mutation={updateCardMutation}
              me={me}
              initialValues={editCard}
              buttonText="Save"
            />
          </div>
        </div>
      )}
    </div>
  );
}
