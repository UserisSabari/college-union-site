# College Union Website Handover Guide 🎓💻

Welcome to the official GEC Palakkad College Union website code repository! If you are reading this, congratulations on being elected or chosen as part of the new College Union's Web/Media committee. 

This website is the official digital portal for Government Engineering College (GEC) Palakkad (also known as *Government Engineering College Sreekrishnapuram Palakkad*, *GEC Sreekrishnapuram*, *GEC SKP*, *GECPKD*, or *GECP*). It serves as the bridge between the union and the student community.

This guide is written for students who might have never coded before. Follow the step-by-step instructions below to keep the website active, updated, and error-free throughout your term!

---

## 1. Project Overview & Tech Stack

Our website is built using modern, fast, and simple web technologies:
*   **The Framework:** **React + Vite** with **TypeScript** for structure and interaction.
*   **Styling (CSS):** **Tailwind CSS** for layout, fonts, and responsiveness.
*   **Hosting:** Hosted on **Vercel**, which means any change you make here will be updated automatically on the live website within a minute!
*   **Domain:** Proposed to run at `collegeunion.gecskp.ac.in` (connected to the official college domain `gecskp.ac.in`).

All the dynamic content (members, notices, events) is stored inside simple text files called **JSON files** inside the `src/data/` folder. You do not need to edit complex code files; you just need to edit these list-like files!

---

## 2. How to Update Members

When a new union takes charge, you must update the page that displays the Office Bearers and Representatives.

### Steps to Update Members:
1.  Open the file located at: `src/data/members.json`
2.  Each member is represented by a block of text enclosed in curly braces `{}`. Locate the block you want to edit or add a new one.
3.  Fill out or edit the fields. Here is what each field means:
    *   `id`: A unique code for each member (e.g., `"member-001"`). Do not duplicate this code.
    *   `name`: The student's full name.
    *   `position`: Their designation (e.g., `"Chairperson"`, `"General Secretary"`, `"CSE Representative"`).
    *   `category`: Must be one of:
        *   `"officeBearer"` (for main executive members)
        *   `"ugRep"` (for department representatives)
        *   `"pgRep"` (for PG representatives)
        *   `"fineArts"` (for arts committee)
        *   `"sports"` (for sports committee)
    *   `department`: Code for their branch (e.g., `"CSE"`, `"ECE"`, `"EEE"`, `"ME"`, `"CE"`, `"AE"`).
    *   `semester`: The student's current semester as a number (e.g., `8` or `6`). Do not wrap numbers in quotation marks.
    *   `photo`: The link to their profile photo (see Section 6 on uploading photos).
    *   `bio`: A short 1-2 sentence description about them.
    *   `responsibilities`: A list of things they handle (separated by commas and enclosed in quotes).
    *   `vision`: A personal quote or goal they want to achieve for the college.
    *   `contact`: Phone/email details.
    *   `socials`: Social media usernames (Instagram, LinkedIn, GitHub).
    *   `year`: The year of this union term (e.g., `"2026-27"`).

### Example JSON Code Snippet:
```json
  {
    "id": "member-001",
    "name": "Ajmal V B",
    "position": "Chairperson",
    "category": "officeBearer",
    "department": "CSE",
    "semester": 8,
    "photo": "https://res.cloudinary.com/gec-palakkad/image/upload/v1/union/chairperson.jpg",
    "bio": "Dedicated to building an inclusive and progressive campus environment.",
    "responsibilities": [
      "Leading union executive meetings",
      "Representing students in college senate and official administrative bodies"
    ],
    "vision": "To establish GEC Palakkad as a hub of academic excellence and active student welfare.",
    "contact": {
      "email": "chairperson.union@gecpalakkad.ac.in",
      "phone": "+919876543210"
    },
    "socials": {
      "instagram": "hey_ajmal",
      "linkedin": "ajmal-vb"
    },
    "year": "2026-27"
  }
```

*Note: Make sure each member block is separated by a comma `,`, but do NOT put a comma after the last block.*

---

## 3. How to Add Announcements & Notices

Announcements and academic notices go to the "News & Notices" board and the homepage updates panel.

### Steps to Add an Announcement:
1.  Open the file located at: `src/data/announcements.json`
2.  Add a new block at the top of the list (just after the opening square bracket `[`).
3.  Fill out these fields:
    *   `id`: A unique code (e.g., `"notice-101"`).
    *   `title`: The heading of the notice.
    *   `body`: The detail text of the notice. You can use markdown stars `**` to make text bold.
    *   `category`: Put either `"notice"`, `"event"`, `"achievement"`, or `"general"`.
    *   `isPinned`: Set to `true` if you want this notice to stay stuck at the top of the page; otherwise, set to `false`.
    *   `isImportant`: Set to `true` to highlight it with an alert indicator; otherwise, `false`.
    *   `publishedAt`: The date and time it is being posted, formatted as `"YYYY-MM-DDTHH:MM:SSZ"` (e.g., `"2026-06-26T10:00:00Z"`).
    *   `attachment`: (Optional) Link to a PDF circular or registration document. Omit this line if there is no attachment.
    *   `tags`: Key terms to categorize it (e.g., `["Academic", "Exams"]`).
    *   `year`: The active academic year (e.g., `"2026-27"`).

### Example JSON Code Snippet:
```json
  {
    "id": "notice-102",
    "title": "Semester Examination Fee Submission Deadline Extension",
    "body": "As per the official notification from APJ Abdul Kalam Technological University (KTU), the last date for registration and fee payment has been extended to June 30, 2026.",
    "category": "notice",
    "isPinned": false,
    "isImportant": true,
    "publishedAt": "2026-06-24T09:00:00Z",
    "attachment": "https://res.cloudinary.com/gec-palakkad/raw/upload/v1/documents/ktu_notification.pdf",
    "tags": ["KTU", "Exams", "Academic"],
    "year": "2026-27"
  }
```

---

## 4. How to Add Events

Events display on the homepage cards and the Events timeline page. They keep the campus active!

### Steps to Add an Event:
1.  Open the file located at: `src/data/events.json`
2.  Add a new block to the list.
3.  Fill out these fields:
    *   `id`: A unique code (e.g., `"event-009"`).
    *   `title`: Name of the event (e.g., `"Dyuthi Arts Festival"`).
    *   `description`: A short sentence summary.
    *   `body`: (Optional) Longer paragraph detail of what is happening.
    *   `date`: The event date in `"YYYY-MM-DD"` format (e.g., `"2026-11-20"`).
    *   `venue`: Location on campus (e.g., `"Main Auditorium"`).
    *   `status`: Must be one of: `"upcoming"`, `"ongoing"`, or `"completed"`.
    *   `category`: Category name (e.g., `"Cultural"`, `"Sports"`, `"Technical"`, `"Social"`).
    *   `coverImage`: A landscape-oriented cover photo link.
    *   `gallery`: List of image links from the event (e.g., `["link1.jpg", "link2.jpg"]`) to display in a photo gallery slider. Keep empty `[]` for upcoming events.
    *   `registrationLink`: Link to the Google Form, website, or portal for registering.
    *   `year`: The union year (e.g., `"2026-27"`).

### Example JSON Code Snippet:
```json
  {
    "id": "event-002",
    "title": "Dyuthi '26 Arts Festival (On-Stage Items)",
    "description": "The major cultural extravaganza featuring stage performance events, music, drama, dance, and art contests.",
    "date": "2026-11-20",
    "venue": "Main Auditorium & Open Stage",
    "status": "upcoming",
    "category": "Cultural",
    "coverImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    "gallery": [],
    "registrationLink": "https://forms.gle/gecskp-dyuthi-26",
    "year": "2026-27"
  }
```

---

## 5. How to Archive a Year

At the end of your tenure, you must preserve your union's achievements, members, and events before clearing the site for the next batch. This is called **Archiving**.

### Steps to Archive:
1.  **Create Archive File:** Create a new JSON file inside the `src/data/archive/` directory named after your academic year (e.g., `2026-27.json`).
2.  **Move Data:** Copy your members, events, and reports list into this new file, matching this format:
    ```json
    {
      "year": "2026-27",
      "chairperson": {
        "name": "Ajmal V B",
        "department": "Computer Science & Engineering",
        "photo": "https://res.cloudinary.com/gec-palakkad/image/upload/v1/union/chairperson.jpg"
      },
      "stats": {
        "members": 12,
        "events": 10,
        "initiatives": 6
      },
      "members": [
        /* Copy your members list from members.json here */
      ],
      "events": [
        /* Copy your completed events list from events.json here */
      ],
      "documents": {
        "report": "Link to annual report PDF",
        "magazine": "Link to college magazine PDF",
        "electionResults": "Link to election results notice PDF"
      },
      "gallery": [
        /* Copy links to top memories here */
      ]
    }
    ```
3.  **Clean Up Active Data:** Clear out the main `src/data/members.json`, `src/data/events.json`, and `src/data/announcements.json` files for the next team. Replace them with fresh placeholders for the incoming team's year (e.g. `"2027-28"`).

---

## 6. How to Upload Photos & PDFs (Media Hosting)

Do **NOT** upload images or PDFs directly into the website code repository. Doing so will make the code heavy and slow down the site. Instead, we use **Cloudinary** (a free media cloud service).

### Steps to Upload:
1.  Log into your team's Cloudinary account. (Create a free account or ask the previous web team for the credentials).
2.  Go to the **Media Explorer** and navigate to the `union/` folder.
3.  Click **Upload** and drop your image or document.
4.  **Optimize:** Before uploading, compress your images. You can use free web services like *TinyPNG* or *Squoosh*. Avoid uploading images larger than 1MB.
5.  **Get Link:** Once uploaded, hover over the image in Cloudinary, click the **Copy Link** icon, and paste that URL into your JSON files (like the `photo` or `coverImage` field).

---

## 7. How to Deploy Your Changes Live

To make your edits visible to the whole world, you need to push your local edits to the GitHub repository.

### Steps to Deploy:
1.  Open your command terminal in the project directory.
2.  Save your edits by running:
    ```bash
    git add .
    ```
3.  Write a simple note explaining what you changed (called a commit):
    ```bash
    git commit -m "update: added announcements for sports meet"
    ```
4.  Send it live:
    ```bash
    git push origin main
    ```
5.  **Check Progress:** Open the Vercel dashboard. The system will start building the website automatically. Within 1-2 minutes, you will see your updates live on `collegeunion.gecskp.ac.in`!

---

## 8. Common Mistakes to Avoid (Top 5 Pitfalls)

🚫 **1. Missing Commas or Brackets in JSON**
This is the most common error. If you miss a comma `,` between items, or forget a closing curly brace `}` or bracket `]`, the build will fail, and the site won't load. Always check that all brackets open and close properly.

🚫 **2. Direct Upload of Massive Photos**
Uploading 5MB to 10MB raw mobile photos will make the website load very slowly. Always compress images to under 400KB before uploading them to Cloudinary.

🚫 **3. Relative File Paths**
Never use local file paths (like `C:/Users/name/Desktop/photo.jpg`) in the JSON files. The website is hosted in the cloud, so it can only read internet web links (starting with `https://`).

🚫 **4. Deleting ID Identifiers**
Do not change or delete the `"id"` values randomly on existing entries. Other parts of the code might be tracking these IDs to link items.

🚫 **5. Forgetting to test locally**
Before executing `git push`, run `npm run dev` in your terminal to see if the website loads properly on your computer. If there's an error, fix it before pushing!

---

## 9. Contacts for Technical Help 📞

If you run into issues, get stuck with code, or the website goes down, reach out to the previous developers or teachers-in-charge:

*   **Lead Student Developer (2026-27):** Sabari S (CSE Department) — `pkd23cs055@gecskp.ac.in` | `github.com/userissabari`
*   **Alternative Developer Contact:** [Insert Name] — `developer@gecskp.ac.in`
*   **College Union Advisor:** [Insert Teacher Name/Designation] — `office@gecskp.ac.in`

---
*Created with ❤️ by the GEC Palakkad College Union Web Team.*
