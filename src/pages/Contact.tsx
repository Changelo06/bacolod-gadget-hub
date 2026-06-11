/**
 * File: src/pages/Contact.tsx
 * Purpose: Contact and support page for iWarehouse customers.
 * Notes: Includes validated inquiry form, branch details, chat links, and embedded store map.
 */
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Clock, Mail, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent!", {
        description: "We'll get back to you within one business day.",
        position: "top-center",
      });
    }, 600);
  };

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Get in touch.</h1>
        <p className="text-foreground/70 mt-3 text-lg">
          Visit a branch, send a message, or chat with us on Messenger or Viber.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 p-8 rounded-3xl bg-secondary/60">
          <h2 className="text-2xl font-semibold mb-6">Send a message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" maxLength={100} className="mt-1.5 h-11 rounded-xl bg-background" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" maxLength={255} className="mt-1.5 h-11 rounded-xl bg-background" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" maxLength={1000} rows={5} className="mt-1.5 rounded-xl bg-background" />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={submitting} size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full">
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <InfoRow icon={MapPin} title="888 Mall, Bacolod" body="Plus Cadiz, La Carlota, Dumaguete & Kabankalan." />
          <InfoRow icon={Phone} title="Call us" body="+63 900 000 0000" />
          <InfoRow icon={Mail} title="Email" body="hello@iwarehouse.ph" />
          <InfoRow icon={Clock} title="Store hours" body="Mon-Sun - 9:00 AM - 8:00 PM" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a href="https://m.me/iwarehousebacolod" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 rounded-full bg-[#0084ff] hover:opacity-90 text-white font-medium text-sm transition-opacity">
              <Facebook className="h-4 w-4" /> Messenger
            </a>
            <a href="viber://chat?number=%2B639000000000"
              className="flex items-center justify-center gap-2 h-11 rounded-full bg-[#7360f2] hover:opacity-90 text-white font-medium text-sm transition-opacity">
              <MessageCircle className="h-4 w-4" /> Viber
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl overflow-hidden aspect-[16/7]">
        <iframe title="iWarehouse Bacolod location"
          src="https://www.google.com/maps?q=888+Mall+Bacolod&output=embed"
          className="w-full h-full" loading="lazy" />
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) => (
  <div className="flex gap-3 p-5 rounded-2xl bg-secondary/60">
    <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
      <Icon className="h-5 w-5 text-accent" />
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  </div>
);

export default Contact;
