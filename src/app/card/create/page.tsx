// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const templates = [
//   {
//     id: "modern",
//     name: "Modern",
//     description: "Clean and contemporary design",
//     gradient: "from-blue-500 to-purple-600",
//     preview: "bg-gradient-to-r from-blue-500 to-purple-600",
//   },
//   {
//     id: "minimal",
//     name: "Minimal",
//     description: "Simple and elegant",
//     gradient: "from-pink-500 to-red-500",
//     preview: "bg-gradient-to-r from-pink-500 to-red-500",
//   },
//   {
//     id: "corporate",
//     name: "Corporate",
//     description: "Professional and business-focused",
//     gradient: "from-cyan-500 to-blue-500",
//     preview: "bg-gradient-to-r from-cyan-500 to-blue-500",
//   },
// ];

// export default function CreateCard() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState("modern");
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "John",
//     lastName: "Doe",
//     jobTitle: "",
//     company: "",
//     email: "john.doe@example.com",
//     phone: "",
//     website: "",
//     bio: "",
//     address: "",
//     city: "",
//     country: "",
//     nationality: "",
//     dateOfBirth: "",
//     gender: "",
//     linkedin: "",
//     twitter: "",
//     github: "",
//     instagram: "",
//   });

//   const handleTemplateSelect = (templateId: string) => {
//     setSelectedTemplate(templateId);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       router.push("/card/1");
//     }, 1000);
//   };

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link
//               href="/profile"
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               <span>Back to Profile</span>
//             </Link>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-4 h-4 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
//                   />
//                 </svg>
//               </div>
//               <span className="font-semibold text-gray-900">
//                 Create Digital ID Card
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-center space-x-4">
//             {[1, 2, 3].map((stepNumber) => (
//               <div key={stepNumber} className="flex items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                     step >= stepNumber
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {stepNumber}
//                 </div>
//                 {stepNumber < 3 && (
//                   <div
//                     className={`w-12 h-1 mx-2 ${
//                       step > stepNumber ? "bg-blue-600" : "bg-gray-200"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-2">
//             <p className="text-sm text-gray-600">
//               {step === 1 && "Choose Template"}
//               {step === 2 && "Personal Information"}
//               {step === 3 && "Review & Create"}
//             </p>
//           </div>
//         </div>

//         {/* Step 1: Template Selection */}
//         {step === 1 && (
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Choose Your Card Template
//             </h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               {templates.map((template) => (
//                 <div
//                   key={template.id}
//                   onClick={() => handleTemplateSelect(template.id)}
//                   className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
//                     selectedTemplate === template.id
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`w-full h-32 rounded-lg ${template.preview} mb-4`}
//                   />
//                   <h3 className="font-semibold text-gray-900 mb-1">
//                     {template.name}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {template.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={nextStep}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 2: Personal Information */}
//         {step === 2 && (
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Personal Information
//             </h2>
//             <form className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Job Title
//                   </label>
//                   <input
//                     type="text"
//                     name="jobTitle"
//                     value={formData.jobTitle}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Software Engineer"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Tech Corp"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Website
//                 </label>
//                 <input
//                   type="url"
//                   name="website"
//                   value={formData.website}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="https://example.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Tell us about yourself..."
//                 />
//               </div>

//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nationality
//                   </label>
//                   <input
//                     type="text"
//                     name="nationality"
//                     value={formData.nationality}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., American"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="123 Main St"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="New York"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="United States"
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
//                 Social Media
//               </h3>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     LinkedIn
//                   </label>
//                   <input
//                     type="url"
//                     name="linkedin"
//                     value={formData.linkedin}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="https://linkedin.com/in/username"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Twitter
//                   </label>
//                   <input
//                     type="url"
//                     name="twitter"
//                     value={formData.twitter}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="https://twitter.com/username"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     GitHub
//                   </label>
//                   <input
//                     type="url"
//                     name="github"
//                     value={formData.github}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="https://github.com/username"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Instagram
//                   </label>
//                   <input
//                     type="url"
//                     name="instagram"
//                     value={formData.instagram}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="https://instagram.com/username"
//                   />
//                 </div>
//               </div>
//             </form>

//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={nextStep}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Review and Create */}
//         {step === 3 && (
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Review Your Information
//             </h2>

//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Preview */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Card Preview
//                 </h3>
//                 <div
//                   className={`rounded-xl p-6 text-white ${
//                     templates.find((t) => t.id === selectedTemplate)?.preview
//                   }`}
//                 >
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-xl font-bold">
//                         {formData.firstName[0]}
//                         {formData.lastName[0]}
//                       </span>
//                     </div>
//                     <h4 className="text-xl font-bold mb-1">
//                       {formData.firstName} {formData.lastName}
//                     </h4>
//                     {formData.jobTitle && (
//                       <p className="text-sm opacity-90 mb-2">
//                         {formData.jobTitle}
//                       </p>
//                     )}
//                     {formData.company && (
//                       <p className="text-xs opacity-75">{formData.company}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Information Summary */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Information Summary
//                 </h3>
//                 <div className="space-y-3 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Name:</span>
//                     <span className="font-medium">
//                       {formData.firstName} {formData.lastName}
//                     </span>
//                   </div>
//                   {formData.jobTitle && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Job Title:</span>
//                       <span className="font-medium">{formData.jobTitle}</span>
//                     </div>
//                   )}
//                   {formData.company && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Company:</span>
//                       <span className="font-medium">{formData.company}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Email:</span>
//                     <span className="font-medium">{formData.email}</span>
//                   </div>
//                   {formData.phone && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Phone:</span>
//                       <span className="font-medium">{formData.phone}</span>
//                     </div>
//                   )}
//                   {formData.website && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Website:</span>
//                       <span className="font-medium">{formData.website}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={prevStep}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 {loading ? "Creating Card..." : "Create Card"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
