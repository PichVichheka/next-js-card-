"use client";
import { useState, useMemo } from "react";
import type {
  ICard,
  ICardResponse,
  GenderType,
  CardType,
} from "@/app/store/types/card-type";
import MinimalCard from "../minimal-card";
import ModernCard from "../modern-card";
import CorporateCard from "../corporate-card";
type Props = {
  cards: ICardResponse;
};

const PublicCardServerSide = ({ cards }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cardArray = cards?.card || [];

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    cardArray.forEach((card) => types.add(card.card_type));
    return Array.from(types) as Array<"Minimal" | "Modern" | "Corporate">;
  }, [cardArray]);

  const [selectedType, setSelectedType] = useState<
    "Minimal" | "Modern" | "Corporate"
  >(availableTypes[0] ?? "Modern");

  const filteredCards = cardArray.filter(
    (card) => card.card_type === selectedType
  );

  const renderCardComponent = (card: ICard, idx: number) => {
    // Construct IUser and CardItem objects to match expected types
    const userData = {
      message: "",
      data: {
        ...card.user,
        idCard: [],
      },
    };
    const cardItem = {
      ...card,
      user: userData,
      gender: card.gender as GenderType,
      card_type: card.card_type as CardType,
      qr_url: card.qr_url === null ? undefined : card.qr_url,
      qr_code: card.qr_code === null ? undefined : card.qr_code,
      theme_color: card.theme_color === null ? undefined : card.theme_color,
    };
    switch (card.card_type) {
      case "Minimal":
        return (
          <MinimalCard
            key={idx}
            me={userData}
            card={cardItem}
            idx={idx}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      case "Modern":
        return (
          <ModernCard
            key={idx}
            me={userData}
            card={cardItem}
            idx={idx}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      case "Corporate":
        return (
          <CorporateCard
            key={idx}
            me={userData}
            card={cardItem}
            idx={idx}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      default:
        return null;
    }
  };

  // Handle case where no cards are available
  if (!cards || !cardArray.length) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500">No cards found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Card list scrollable with padding to avoid overlap */}
      <div className="overflow-y-auto pb-28 px-3 pt-4 max-w-md mx-auto">
        {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
          filteredCards.map((card: ICard, idx: number) => (
            <div
              key={idx}
              className="mb-6 transition-all duration-300 ease-in-out"
            >
              {renderCardComponent(card, idx)}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No {selectedType} cards found
          </p>
        )}
      </div>

      {/* Bottom sticky button group for mobile view */}
      {availableTypes.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-md py-3 flex justify-center gap-3 z-50 px-2">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                selectedType === type
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicCardServerSide;
