export type ContactFieldType = "text" | "email" | "tel" | "textarea" | "date";

export type ContactField = {
  id: string;
  label: string;
  type: ContactFieldType;
  required?: boolean;
};

export type ContactServiceKey =
  | "general"
  | "work-abroad"
  | "study-abroad"
  | "visa-assistance"
  | "travel-tourism";

export const serviceOptions: { value: ContactServiceKey; label: string }[] = [
  { value: "general", label: "General Enquiry" },
  { value: "work-abroad", label: "Work Abroad" },
  { value: "study-abroad", label: "Study Abroad" },
  { value: "visa-assistance", label: "Visa Assistance" },
  { value: "travel-tourism", label: "Travel & Tourism" },
];

// Fields beyond the common Full Name + WhatsApp, per service.
export const contactFieldsByService: Record<ContactServiceKey, ContactField[]> = {
  general: [
    { id: "email", label: "Email", type: "email" },
    { id: "message", label: "Message", type: "textarea", required: true },
  ],
  "work-abroad": [
    { id: "email", label: "Email", type: "email" },
    { id: "country", label: "Country", type: "text" },
    { id: "sector", label: "Job / Sector", type: "text" },
    { id: "experience", label: "Experience", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  "study-abroad": [
    { id: "email", label: "Email", type: "email" },
    { id: "destination", label: "Destination", type: "text" },
    { id: "studyLevel", label: "Study Level", type: "text" },
    { id: "course", label: "Course", type: "text" },
    { id: "intake", label: "Intended Intake", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  "visa-assistance": [
    { id: "destination", label: "Destination", type: "text" },
    { id: "purpose", label: "Visa Purpose", type: "text" },
    { id: "timeline", label: "Travel Timeline", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  "travel-tourism": [
    { id: "destination", label: "Destination", type: "text" },
    { id: "travelDates", label: "Travel Dates", type: "text" },
    { id: "travellers", label: "Number of Travellers", type: "text" },
    { id: "travelType", label: "Travel Type", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
};
