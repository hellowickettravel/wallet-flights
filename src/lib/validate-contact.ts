import { contactLimits, contactTopics, type ContactTopic } from "@/content/contact";

export type ContactInput = { name: string; email: string; topic: ContactTopic | ""; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;

/** Shared by the form (instant feedback) and the API route (source of truth). */
export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const message = v.message.trim();
  if (!name) e.name = "Enter your name";
  else if (name.length > contactLimits.name) e.name = `Keep your name under ${contactLimits.name} characters`;
  // Control characters (line breaks included) have no place in a name, and the name goes into the email subject.
  else if (CONTROL.test(name)) e.name = "Use letters, spaces and punctuation only";
  if (!EMAIL.test(v.email.trim()) || v.email.length > 254) e.email = "Enter an email address like name@example.com";
  if (!contactTopics.some((t) => t.id === v.topic)) e.topic = "Choose what your message is about";
  if (message.length < contactLimits.messageMin) e.message = "Tell us a little more (at least 10 characters)";
  else if (message.length > contactLimits.message) e.message = `Keep your message under ${contactLimits.message} characters`;
  return e;
}
