import { studio } from "@/data/content";

export function WhatsAppButton({ service }: { service?: string } = {}) {
  const message = service
    ? `Hello Christophany Studios, I would like to enquire about ${service} photography.`
    : "Hello Christophany Studios, I would like to enquire about your photography services.";

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with Christophany Studios on WhatsApp${service ? ` about ${service}` : ""}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a12 12 0 0 0 5.7 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.4 18.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.7 9.7 0 0 1-1.5-5.2 9.9 9.9 0 0 1 10-9.9 9.8 9.8 0 0 1 9.9 9.9c0 5.5-4.5 9.9-9.9 9.9Zm5.5-7.4c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9.1 9.1 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3l1.6.5c.7.2 1.3.1 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.3s-.2-.2-.5-.4Z" /></svg>
      <span>Chat with us</span>
    </a>
  );
}
