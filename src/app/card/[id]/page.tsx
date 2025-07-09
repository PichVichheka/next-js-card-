'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Static card data
const cardData = {
  id: '1',
  template: 'modern',
  firstName: 'John',
  lastName: 'Doe',
  jobTitle: 'Senior Software Engineer',
  company: 'Tech Solutions Inc.',
  email: 'john.doe@techsolutions.com',
  phone: '+1 (555) 123-4567',
  website: 'https://johndoe.dev',
  bio: 'Passionate software engineer with 8+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies.',
  address: '123 Innovation Drive',
  city: 'San Francisco',
  country: 'United States',
  nationality: 'American',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  linkedin: 'https://linkedin.com/in/johndoe',
  twitter: 'https://twitter.com/johndoe',
  github: 'https://github.com/johndoe',
  instagram: 'https://instagram.com/johndoe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const templates = {
  modern: {
    gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    textColor: 'text-white',
    accentColor: 'bg-white/20'
  },
  minimal: {
    gradient: 'bg-gradient-to-br from-pink-500 to-red-500',
    textColor: 'text-white',
    accentColor: 'bg-white/20'
  },
  corporate: {
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    textColor: 'text-white',
    accentColor: 'bg-white/20'
  }
};

export default function CardView() {
  const params = useParams();
  const [card, setCard] = useState(cardData);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const template = templates[card.template as keyof typeof templates] || templates.modern;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.firstName} ${card.lastName} - Digital ID Card`,
          text: `Check out ${card.firstName} ${card.lastName}'s digital ID card`,
          url: currentUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy to clipboard
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying:', error);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF/image
    alert('Download feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Digital ID Card</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowQR(!showQR)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Show QR Code"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Card */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl shadow-xl overflow-hidden ${template.gradient}`}>
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={card.avatar}
                      alt={`${card.firstName} ${card.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                    />
                    <div>
                      <h1 className={`text-2xl font-bold ${template.textColor}`}>
                        {card.firstName} {card.lastName}
                      </h1>
                      {card.jobTitle && (
                        <p className={`text-lg ${template.textColor} opacity-90`}>
                          {card.jobTitle}
                        </p>
                      )}
                      {card.company && (
                        <p className={`text-sm ${template.textColor} opacity-75`}>
                          {card.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${template.accentColor} rounded-full flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                </div>

                {/* Bio */}
                {card.bio && (
                  <div className="mb-6">
                    <p className={`${template.textColor} opacity-90 leading-relaxed`}>
                      {card.bio}
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {card.email && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${template.accentColor} rounded-lg flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className={`${template.textColor} opacity-90`}>{card.email}</span>
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${template.accentColor} rounded-lg flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className={`${template.textColor} opacity-90`}>{card.phone}</span>
                    </div>
                  )}
                  {card.website && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${template.accentColor} rounded-lg flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                      </div>
                      <a 
                        href={card.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${template.textColor} opacity-90 hover:opacity-100 underline`}
                      >
                        {card.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {card.address && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${template.accentColor} rounded-lg flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className={`${template.textColor} opacity-90`}>
                        {card.address}, {card.city}, {card.country}
                      </span>
                    </div>
                  )}
                </div>

                {/* Personal Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {card.nationality && (
                    <div className="text-center">
                      <div className={`text-xs ${template.textColor} opacity-75 mb-1`}>Nationality</div>
                      <div className={`font-medium ${template.textColor}`}>{card.nationality}</div>
                    </div>
                  )}
                  {card.dateOfBirth && (
                    <div className="text-center">
                      <div className={`text-xs ${template.textColor} opacity-75 mb-1`}>Date of Birth</div>
                      <div className={`font-medium ${template.textColor}`}>
                        {new Date(card.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {card.gender && (
                    <div className="text-center">
                      <div className={`text-xs ${template.textColor} opacity-75 mb-1`}>Gender</div>
                      <div className={`font-medium ${template.textColor}`}>{card.gender}</div>
                    </div>
                  )}
                </div>

                {/* Social Media */}
                {(card.linkedin || card.twitter || card.github || card.instagram) && (
                  <div className="flex justify-center space-x-4">
                    {card.linkedin && (
                      <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${template.accentColor} rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors`}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {card.twitter && (
                      <a
                        href={card.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${template.accentColor} rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors`}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {card.github && (
                      <a
                        href={card.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${template.accentColor} rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors`}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {card.instagram && (
                      <a
                        href={card.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${template.accentColor} rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors`}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            {showQR && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
                <div className="qr-code mx-auto">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm text-gray-600">QR Code</div>
                      <div className="text-xs text-gray-500">(Would generate here)</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Scan to view this card on mobile
                </p>
              </div>
            )}

            {/* Share Options */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Card</h3>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
                
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                    copied 
                      ? 'border-green-500 text-green-600 bg-green-50' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Card Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-medium capitalize">{card.template}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shares:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 