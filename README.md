# GEC Palakkad College Union Website 🎓💻

Welcome to the official repository of the Secular College Union portal of **Government Engineering College (GEC) Palakkad** (*Sreekrishnapuram, Kerala*). 

This portal serves as the primary digital gateway for the college union, facilitating updates, event registrations, campus announcements, student advocacy, and historical preservation.

---

## 🚀 Key Features

*   **📰 Notices & Announcements Board:** Real-time updates on academic notifications, sports meets, cultural events, and college achievements.
*   **👥 Union Directory:** Comprehensive, structured profile showcase of current Union Office Bearers, Department Representatives, and Committee Members.
*   **📅 Events & Gallery:** Interactive timeline of campus events, registration gateways, and dynamic photo galleries.
*   **🗳️ Student Voice Portal:** Secure interface allowing students to submit suggestions, concerns, or feedback directly to the union administration.
*   **🏛️ Archive System:** Permanently preserves previous union terms, executive details, annual reports, magazines, and statistics.
*   **🔍 Universal Site Search:** Instant query highlight and navigation shortcut triggerable using `Ctrl + K` / `Cmd + K`.
*   **🌗 Dark Mode:** Fully responsive theme-toggle supporting system defaults and manual overrides.

---

## 🛠️ Technology Stack

*   **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling & UI:** [Tailwind CSS v3](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Micro-animations)
*   **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async) (Page-specific meta header injection)
*   **Hosting:** Deployments configured on [Vercel](https://vercel.com/)
*   **Media Cloud:** [Cloudinary](https://cloudinary.com/) (Free tier media storage)

---

## 💻 Local Development Setup

To run this project locally on your machine:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/UserisSabari/college-union-site.git
    cd college-union-site
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables Configuration:**
    Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and set your Web3Forms Access Key for contact & anonymous voice form delivery:
    ```env
    VITE_WEB3FORMS_KEY=your_web3forms_access_key_here
    ```

4.  **Launch Dev Server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173` to view the website.

5.  **Lint & Code Quality Check:**
    ```bash
    npm run lint
    ```

5.  **Compile Production Bundle:**
    ```bash
    npm run build
    ```

---

## 📁 Content Management Guide

Content (announcements, events, members lists, initiatives) is decoupled from logic and stored in simple JSON files under the `src/data/` directory.

For step-by-step documentation on updating members, adding notices, archiving terms, and optimizing image uploads, please read the [HANDOVER_GUIDE.md](file:///c:/Web%20Development/college-union-site/HANDOVER_GUIDE.md).

---

## 👥 Web & Media Committee

*   **Lead Developer:** Sabari S (CSE Department) — `pkd23cs055@gecskp.ac.in`
*   **Co-Developer:** Aiswarya P (IT Department) — `pkd24it008@gecskp.ac.in`

*Created with ❤️ by the GEC Palakkad College Union Web Team.*
