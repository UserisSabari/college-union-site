export interface Member {
  id: string;
  name: string;
  position: string;         // "Chairperson" | "Vice Chairperson" | etc.
  category: "officeBearer" | "ugRep" | "pgRep" | "ladiesRep" | "scstRep";
  department: string;       // "CSE" | "ECE" | "EEE" | "ME" | "CE" | "AE"
  semester: number;
  photo: string;            // Cloudinary URL
  bio: string;
  responsibilities: string[];
  vision: string;
  contact: {
    email?: string;
    phone?: string;
  };
  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  year: string;             // "2024-25"
}

export interface Announcement {
  id: string;
  title: string;
  body: string;             // Markdown supported
  category: "notice" | "event" | "achievement" | "general";
  isPinned: boolean;
  isImportant: boolean;
  publishedAt: string;      // ISO date
  expiresAt?: string;
  attachment?: string;      // PDF URL
  tags: string[];
  year: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  status: "upcoming" | "ongoing" | "completed";
  category: string;
  coverImage: string;
  gallery: string[];
  registrationLink?: string;
  documents?: string[];
  year: string;
}

export interface ArchiveYear {
  year: string;             // "2024-25"
  chairperson: string;
  members: Member[];
  events: Event[];
  highlights: string[];
  magazinePdf?: string;
  reportPdf?: string;
  galleryAlbum?: string;
}
