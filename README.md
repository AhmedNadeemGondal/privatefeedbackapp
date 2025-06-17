# Private Feedback Application

This project is a modern, full-stack web application designed for a private feedback system. It serves as a comprehensive demonstration in contemporary web development practices, encompassing both robust backend solutions and intuitive frontend experiences.

---

## Live Demo

[View Live Vercel Deployment](https://privatefeedbackapp-nextjs.vercel.app/)

---

## API & Data Handling

This application features a comprehensive backend and a secure and scalable data management solutions.

- **Database Management (MongoDB with Mongoose):** Utilizing a MongoDB Atlas instance.
- **Secure Authentication & Authorization (NextAuth.js & bcrypt):** Integrated **NextAuth.js** to handle authentication flows, providing secure user sign-up, login, and session management. **Bcrypt** is utilized for robust, one-way password hashing, safeguarding user credentials.
- **Backend API Development (Next.js API Routes):** Leveraged **Next.js API routes** to create a well-structured **RESTful API** for handling all feedback-related operations, user management, and other server-side logic.
- **External AI Integration (TogetherAI):** Utilized **Together.ai** API with the backend for generating suggested messages.

---

## Features

- **Comprehensive Backend API:** Developed a robust backend for managing feedback, user authentication, and application logic.
- **Secure Authentication & Authorization:** Implemented secure user sign-up, login, and session management with password hashing.
- **Intuitive User Interface:** Designed and implemented an intuitive and visually appealing interface for feedback submission and clear information display.
- **Robust Form Handling:** Developed secure and user-friendly forms with effective input handling and comprehensive validation rules.
- **Scalable Frontend Architecture:** Built with Next.js to ensure high performance, scalability, and maintainability.
- **Responsive Design:** Ensures optimal viewing and interaction across a wide range of devices and screen sizes.
- **Email Integration:** Configured and utilized email services for features like user notifications or feedback confirmations.
- **AI Integration:** Explored and implemented basic AI capabilities using Together AI for enhanced application functionality.

---

## Technologies Used

- **Frameworks:** **Next.js**
- **Backend/Database:** **Mongoose**, **MongoDB** (via Mongoose), **Next.js API Routes**
- **Authentication:** **NextAuth.js**, **bcrypt**
- **AI/Utilities:** `together-ai`, `usehooks-ts`, `next-themes`
- **Styling & UI Components:** **Tailwind CSS**, **Shadcn**
- **Carousel/Sliders:** `embla-carousel-react`, `embla-carousel-autoplay`
- **Form Handling & Validation:** `react-hook-form`, `@hookform/resolvers`, `zod`
- **Email Services:** `@react-email/components`, `react-email`, `resend`
- **Deployment:** Vercel

---

## Installation

```sh
# Clone the repository (replace with actual repo link once available)
git clone [your-repo-link]
cd [your-repo-name]

# Install dependencies
npm install

# Create a .env file and add required environment variables (e.g., MongoDB URI, NextAuth.js secrets, Email API keys)

# Start the development server
npm run dev
```
