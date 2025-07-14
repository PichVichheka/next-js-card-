"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const cardData = {
  id: "1",
  template: "modern",
  firstName: "Line",
  lastName: "",
  jobTitle: "Web Developer",
  company: "Tech Solutions",
  bio: "Passionate about creating beautiful and functional web applications.",
  address: "123 Tech Street",
  phone: "+ 070836872",
  email: "line@gmail.com",
  url: "https://line.dev",
  website: "https://web.telegram.org/k/",
  social: "facebook.com",
  instagram: "https://www.instagram.com/your_username",
  avatar: "https://example.com/path-to-your-image.jpg",
};

export default function CardView() {
  const [card, setCard] = useState(cardData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md text-white shadow-xl">
        <div className="flex flex-col items-center p-6">
          <img
            src={card.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-bold">{card.firstName}</h2>
          <span className="bg-pink-400 text-sm px-4 py-1 rounded-md mt-1 mb-4 ">
            {card.jobTitle}
          </span>

          <p className="text-center text-sm mb-6 px-2 opacity-90">{card.bio}</p>

          <div className="grid grid-cols-2 gap-3 text-sm w-full">
            <div className="bg-white/20 rounded-xl p-3">
              <p className="text-xs opacity-80 ">Call Me</p>
              <a href="">
                <p className="hover:underline ">{card.phone}</p>
              </a>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="text-xs opacity-80">Email Me</p>
              <a
                href={card.email}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {card.email.replace(/^https?:\/\//, "")}
              </a>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="text-xs opacity-80">Visit</p>
              <a
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {card.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <p className="text-xs opacity-80">Find Me</p>
              <a
                href={card.social}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {card.social.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>

          <button className="mt-6 w-full py-3 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition">
            ✨ Save My Contact ✨
          </button>

          <a
            href={card.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block w-full text-center text-sm bg-white/10 rounded-xl py-2 hover:bg-white/20 transition"
          >
            <div className="flex justify-center items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="w-5 h-5"
              />
              Instagram
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
