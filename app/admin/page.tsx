import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { databaseConfigured, enquiryStatuses, listEnquiries, type StoredEnquiry } from "@/lib/db";
import { login, logout, setStatus } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

const errors: Record<string, string> = {
  invalid: "Incorrect password.",
  locked: "Too many attempts. Try again in a few minutes.",
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; status?: string }> }) {
  const { error, status } = await searchParams;

  if (!adminConfigured()) {
    return <div className="page-shell admin-page"><h1>Admin</h1><p>Set <code>ADMIN_PASSWORD</code> in the environment to enable this page.</p></div>;
  }

  if (!(await isAdmin())) {
    return (
      <div className="page-shell admin-page">
        <h1>Admin <em>sign in.</em></h1>
        <form action={login} className="admin-login">
          <label>Password<input type="password" name="password" required autoComplete="current-password" /></label>
          {error && <p className="admin-error" role="alert">{errors[error] ?? "Could not sign in."}</p>}
          <button className="button button-dark" type="submit">Sign in</button>
        </form>
      </div>
    );
  }

  let enquiries: StoredEnquiry[] = [];
  let loadError = "";
  if (!databaseConfigured()) loadError = "Database is not configured. Set DATABASE_URL.";
  else {
    try {
      enquiries = await listEnquiries(status);
    } catch (e) {
      console.error("Admin could not load enquiries:", e);
      loadError = "Could not load enquiries from the database.";
    }
  }

  return (
    <div className="page-shell admin-page">
      <div className="admin-head">
        <h1>Enquiries</h1>
        <form action={logout}><button className="button button-dark" type="submit">Sign out</button></form>
      </div>
      <nav className="admin-filters" aria-label="Filter by status">
        <a href="/admin" aria-current={!status ? "page" : undefined}>All</a>
        {enquiryStatuses.map((s) => <a key={s} href={`/admin?status=${s}`} aria-current={status === s ? "page" : undefined}>{s}</a>)}
      </nav>
      {loadError && <p className="admin-error" role="alert">{loadError}</p>}
      {!loadError && enquiries.length === 0 && <p>No enquiries yet.</p>}
      <div className="admin-list">
        {enquiries.map((e) => (
          <article className="admin-card" key={e.id}>
            <header>
              <div><h2>{e.name}</h2><span>{e.service} · {e.created_at}</span></div>
              <form action={setStatus} className="admin-status">
                <input type="hidden" name="id" value={e.id} />
                <select name="status" defaultValue={e.status} aria-label={`Status for ${e.name}`}>
                  {enquiryStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="submit">Update</button>
              </form>
            </header>
            <dl>
              <dt>Email</dt><dd><a href={`mailto:${e.email}`}>{e.email}</a></dd>
              <dt>Phone</dt><dd><a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`}>{e.phone}</a></dd>
              <dt>Preferred date</dt><dd>{e.preferred_date || "—"}</dd>
              <dt>Alternative date</dt><dd>{e.alternative_date || "—"}</dd>
              <dt>Location</dt><dd>{e.location || "—"}</dd>
              <dt>Session</dt><dd>{e.session_type || "—"}</dd>
              <dt>Budget</dt><dd>{e.budget || "—"}</dd>
              <dt>Contact via</dt><dd>{e.contact_method || "—"}</dd>
            </dl>
            {e.details && <p className="admin-details">{e.details}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
