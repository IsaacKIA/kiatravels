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
  | "flight-booking"
  | "travel-tourism"
  | "b2b-partnership";

export const serviceOptions: { value: ContactServiceKey; label: string }[] = [
  { value: "work-abroad", label: "Work Abroad / Job Application" },
  { value: "b2b-partnership", label: "Employer / HR Agency Partnership (B2B)" },
  { value: "study-abroad", label: "Study Abroad" },
  { value: "visa-assistance", label: "Visa Assistance" },
  { value: "flight-booking", label: "Flight Booking" },
  { value: "travel-tourism", label: "Travel & Tourism" },
  { value: "general", label: "General Enquiry" },
];

// Fields beyond the common Full Name + WhatsApp, per service.
export const contactFieldsByService: Record<ContactServiceKey, ContactField[]> = {
  general: [
    { id: "email", label: "Email Address", type: "email" },
    { id: "message", label: "Message", type: "textarea", required: true },
  ],
  "work-abroad": [
    { id: "email", label: "Email Address", type: "email" },
    { id: "country", label: "Target Country", type: "text" },
    { id: "sector", label: "Job Role / Sector", type: "text" },
    { id: "experience", label: "Years of Experience / Trade", type: "text" },
    { id: "message", label: "Additional Notes", type: "textarea" },
  ],
  "b2b-partnership": [
    { id: "companyName", label: "Organisation / Institution / Agency Name", type: "text", required: true },
    { id: "email", label: "Official Corporate Email", type: "email", required: true },
    {
      id: "partnershipDivision",
      label: "Partnership Division (Workforce Supply / University Admissions / Travel & DMC)",
      type: "text",
      required: true,
    },
    {
      id: "country",
      label: "Headquarters & Target Corridor (e.g. UAE, UK, Europe, Canada, Ghana Inbound)",
      type: "text",
      required: true,
    },
    {
      id: "message",
      label: "Mandate Overview (Demand Order, Academic Representation, or Travel/DMC Scope)",
      type: "textarea",
      required: true,
    },
  ],
  "study-abroad": [
    { id: "email", label: "Email Address", type: "email" },
    { id: "destination", label: "Destination Country", type: "text" },
    { id: "studyLevel", label: "Study Level (Bachelors, Masters, etc.)", type: "text" },
    { id: "course", label: "Preferred Course / Program", type: "text" },
    { id: "intake", label: "Intended Intake", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  "visa-assistance": [
    { id: "email", label: "Email Address", type: "email" },
    { id: "destination", label: "Destination Country", type: "text" },
    { id: "purpose", label: "Visa Purpose", type: "text" },
    { id: "timeline", label: "Travel Timeline", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  "flight-booking": [
    { id: "email", label: "Email Address", type: "email" },
    { id: "route", label: "Departure & Destination Cities", type: "text", required: true },
    { id: "travelDates", label: "Preferred Travel Dates", type: "text" },
    { id: "travellers", label: "Number of Passengers", type: "text" },
    { id: "message", label: "Additional Flight Preferences", type: "textarea" },
  ],
  "travel-tourism": [
    { id: "email", label: "Email Address", type: "email" },
    { id: "destination", label: "Destination", type: "text" },
    { id: "travelDates", label: "Travel Dates", type: "text" },
    { id: "travellers", label: "Number of Travellers", type: "text" },
    { id: "travelType", label: "Travel Type", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ],
};
