# Digital ID Card System

A mobile-optimized digital ID card system built with Next.js and Tailwind CSS. Create, customize, and share professional digital identity cards with a clean, responsive design.

## Features

### 🎯 Core Features
- **User Registration & Login** - Secure authentication system
- **Profile Management** - Edit personal information and preferences
- **Card Creation** - Multi-step form with template selection
- **Public Card Viewing** - Shareable digital ID cards
- **Mobile-First Design** - Fully responsive across all devices

### 🎨 Design Features
- **Three Card Templates**:
  - **Modern** - Clean and contemporary design
  - **Minimal** - Simple and elegant
  - **Corporate** - Professional and business-focused
- **Custom Gradients** - Beautiful color schemes for each template
- **Responsive Layout** - Optimized for mobile, tablet, and desktop

### 📱 Mobile Optimization
- Touch-friendly interface
- Optimized for mobile sharing
- QR code generation (placeholder)
- Native share functionality
- Mobile-first responsive design

### 🔗 Sharing Features
- Unique URL for each card
- QR code generation
- Social media integration
- Copy to clipboard functionality
- Download capability (placeholder)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Heroicons (SVG)
- **Images**: Unsplash (for demo avatars)

## Project Structure

```
src/
├── app/
│   ├── card/
│   │   ├── create/
│   │   │   └── page.tsx          # Card creation form
│   │   └── [id]/
│   │       └── page.tsx          # Public card view
│   ├── profile/
│   │   ├── edit/
│   │   │   └── page.tsx          # Profile editing
│   │   └── page.tsx              # User profile dashboard
│   ├── demo/
│   │   └── page.tsx              # Demo redirect
│   ├── login/
│   │   └── page.tsx              # Login form
│   ├── register/
│   │   └── page.tsx              # Registration form
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-id-card
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Users

1. **Registration/Login**
   - Visit the homepage
   - Click "Get Started" to register or "Sign In" to login
   - Fill in your details and create an account

2. **Create Your Digital ID Card**
   - After login, you'll be redirected to your profile
   - Click "Create Card" to start the card creation process
   - Choose from three beautiful templates
   - Fill in your personal and professional information
   - Review and create your card

3. **Share Your Card**
   - Your card gets a unique URL
   - Share via social media, email, or QR code
   - Anyone can view your public card without registration

### For Developers

The system is built with static data for demonstration. To integrate with your own API:

1. **Replace Static Data**
   - Update user data in profile pages
   - Connect card creation to your backend
   - Implement real authentication

2. **Add Real Features**
   - QR code generation (e.g., using `qrcode` library)
   - PDF/image download functionality
   - Real-time analytics
   - Database integration

## Key Components

### Card Templates
Each template has its own gradient and styling:
- **Modern**: Blue to purple gradient
- **Minimal**: Pink to red gradient  
- **Corporate**: Cyan to blue gradient

### Form Fields
The card creation form includes:
- Personal information (name, job title, company)
- Contact details (email, phone, website)
- Professional bio
- Address information
- Personal details (nationality, date of birth, gender)
- Social media links (LinkedIn, Twitter, GitHub, Instagram)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and forms
- Optimized typography for all screen sizes

## Customization

### Adding New Templates
1. Add template configuration to the templates array
2. Define gradient classes and styling
3. Update the card preview component

### Styling
All styling is done with Tailwind CSS classes. The design system includes:
- Consistent color palette
- Typography scale
- Spacing system
- Component patterns

### API Integration
Replace the static data and setTimeout calls with real API endpoints:
- User authentication
- Card CRUD operations
- File uploads
- Analytics tracking

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Note**: This is a static demonstration version. For production use, implement proper authentication, database integration, and security measures.
