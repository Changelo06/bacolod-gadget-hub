import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  message: z.string().trim().min(1, "Tell us which device or service you need.").max(1000),
});
const Contact = () => {
  const [params] = useSearchParams();
  const device = params.get("product");
  const option = params.get("option");
  const initialMessage = device ? "Hi! I would like to ask about " + device + (option ? " (" + option + ")" : "") + ". Please confirm the price, stock and payment options at my preferred branch." : "";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewed, setReviewed] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => { next[String(issue.path[0])] = issue.message; });
      setErrors(next);
      event.currentTarget.querySelector<HTMLElement>('[name="' + result.error.issues[0].path[0] + '"]')?.focus();
      return;
    }
    setErrors({});
    setReviewed(true);
  };
  return (
    <div className="container section-space">
      <header className="mb-10 max-w-2xl"><p className="eyebrow">Contact & inquiries</p><h1 className="text-4xl md:text-5xl">Let’s find your next device.</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Have a model, budget or service question? Start with the details below.</p></header>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-lg border p-5 sm:p-8" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title" className="text-2xl">Prepare an inquiry</h2><p id="form-note" className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">This proof-of-concept form does not send messages. Your details stay on this page; a verified contact channel is needed before sending can be enabled.</p>
          <form onSubmit={handleSubmit} onChange={() => setReviewed(false)} noValidate aria-describedby="form-note" className="space-y-5">
            <div><Label htmlFor="name">Name</Label><Input id="name" name="name" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className="mt-2 h-11 text-base" />{errors.name && <p id="name-error" className="mt-2 text-sm text-destructive">{errors.name}</p>}</div>
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" spellCheck={false} autoComplete="email" required maxLength={255} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className="mt-2 h-11 text-base" />{errors.email && <p id="email-error" className="mt-2 text-sm text-destructive">{errors.email}</p>}</div>
            <div><Label htmlFor="message">Device or service inquiry</Label><Textarea defaultValue={initialMessage} id="message" name="message" required maxLength={1000} rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className="mt-2 text-base" />{errors.message && <p id="message-error" className="mt-2 text-sm text-destructive">{errors.message}</p>}</div>
            <Button type="submit" className="h-11">Review inquiry</Button>
            {reviewed && <p role="status" className="rounded-md border p-4 text-sm">Your inquiry is ready to review. Nothing has been sent. Your entries are still available above.</p>}
          </form>
        </section>
        <aside className="border-t pt-6"><h2 className="text-2xl">Planning a visit?</h2><p className="mt-4 leading-relaxed text-muted-foreground">The current branch list includes Bacolod, Cadiz, La Carlota, Dumaguete and Kabankalan. Confirm the branch address, opening hours and device availability before travelling.</p><Button asChild variant="outline" className="mt-6 h-11"><Link to="/store">View branch information</Link></Button><div className="mt-8 border-t pt-6"><h3>Bring the useful details</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">For a device inquiry, include the model, storage, preferred colour and budget. For a repair, describe the issue and the device model.</p></div></aside>
      </div>
    </div>
  );
};
export default Contact;
