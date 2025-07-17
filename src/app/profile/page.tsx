"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, User, Edit3 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import MinimalCard from "@/components/minimal-card";
import ModernCard from "@/components/modern-card";
import CorporateCard from "@/components/corporate-card";
import ProfileFormForModal from "@/components/ui/ProfileFormForModal";
import UpdateUserDialog from "@/components/update-user-dialog";

import { userRequest } from "@/lib/api/user-api";
import { cardRequest } from "@/lib/api/card-api";
// import { AUTH_LOGOUT } from "@/lib/api/auth-api";

import type { FormValues } from "@/components/update-user-dialog";
import type { CardItem, UserData } from "@/app/store/types/user-type";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCard, setEditCard] = useState<CardItem | null>(null);

  const { GET_ME, UPDATE_USER } = userRequest();
  const { CREATE_CARD, UPDATE_CARD } = cardRequest();

  const queryClient = useQueryClient();

  const createCardMutation = useMutation({ mutationFn: CREATE_CARD });
  const updateCardMutation = useMutation({
    mutationFn: (payload) => UPDATE_CARD(editCard?.id ?? "", payload),
  });

  const { data: me, isLoading, isError, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: async () => GET_ME(),
  });

  const { reset } = useForm<FormValues>();

  useEffect(() => {
    if (me?.data) {
      reset({
        full_name: me.data.full_name || "",
        user_name: me.data.user_name || "",
        email: me.data.email || "",
        avatar: me.data.avatar || "",
      });
    }
  }, [me, reset]);

  const mutation = useMutation({
    mutationFn: (data: FormValues) => UPDATE_USER(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
      alert("Failed to update user.");
    },
  });

  const handleSave = async (data: FormValues) => {
    try {
      await UPDATE_USER(data);
      setOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      // await AUTH_LOGOUT();
      // Optionally redirect here
    } catch (err) {
      console.error("Logout failed:", err);
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
  }

  if (isError || !me?.data) {
    return <div>Failed to load user data.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Edit Dialog */}
      <UpdateUserDialog
        user={me.data}
        onSave={handleSave}
        open={open}
        setOpen={setOpen}
      />

      {/* Profile Card */}
      <div className="p-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-0">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={me.data.avatar} alt="Avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {me.data.user_name}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">{me.data.full_name}</h1>
              <Badge variant="secondary" className="text-xs font-medium">
                Premium Member
              </Badge>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">@{me.data.user_name}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{me.data.email}</span>
              </div>

              <div className="flex justify-center gap-6 py-4 border-t border-gray-100">
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
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-md mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          {me.data.idCard?.map((card: CardItem, idx) => {
            const props = {
              me,
              card,
              idx,
              onEdit: () => {
                setEditCard(card);
                setShowEditForm(true);
              },
            };
            if (card.card_type === "Minimal") return <MinimalCard key={idx} {...props} />;
            if (card.card_type === "Modern") return <ModernCard key={idx} {...props} />;
            if (card.card_type === "Corporate") return <CorporateCard key={idx} {...props} />;
            return null;
          })}
        </div>
      </div>

      {/* Create Modal */}
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

      {/* Edit Modal */}
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
