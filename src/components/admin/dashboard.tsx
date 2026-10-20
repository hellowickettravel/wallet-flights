import type { ReactNode } from "react";
import { DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/logo";
import { adminCopy as copy } from "@/content/admin";
import type { Admin } from "@/lib/admin-auth";
import { alertRouteName, alertTrip, date, dateTime, eventText, exportLists, money, nextCheck, type Contact, type Dashboard } from "@/lib/admin-data";
import type { ActivityEvent } from "@/lib/activity";
import { DeletePerson } from "./delete-person";
import { SignOutButton } from "./sign-out-button";

/** Long lists show the newest rows on the page; the CSV export has every row. */
const PAGE_ROWS = 200;

export function AdminBar({ admin }: { admin?: Admin }) {
  return (
    <div className="bg-ink text-white">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <span className="flex items-center gap-3">
          <Logo tone="light" />
          <span className="rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] font-semibold">Admin</span>
        </span>
        {admin && (
          <span className="flex items-center gap-4">
            <span className="hidden text-[0.9375rem] text-white/70 sm:inline">Signed in as {admin.username}</span>
            <SignOutButton />
          </span>
        )}
      </div>
    </div>
  );
}

export function DashboardView({ admin, data, query }: { admin: Admin; data: Dashboard; query: string }) {
  const { now } = data;
  const people = data.contacts.length;
  const lastCheck = data.checks[0];
  return (
    <>
      <AdminBar admin={admin} />
      <div className="container-page space-y-8 py-10 md:py-14">
        <div>
          <h1 className="font-display-tight text-[2rem] leading-tight font-extrabold text-ink md:text-[2.5rem]">{copy.title}</h1>
          <p className="mt-1 text-ink-soft">Updated {dateTime(now)} UK time</p>
        </div>

        <dl className="grid grid-cols-2 overflow-hidden rounded-(--radius-panel) bg-white ring-1 ring-line lg:grid-cols-4">
          {[
            [copy.stats.subscribers, data.subscribers.length],
            [copy.stats.alerts, data.alerts.length],
            [copy.stats.people, people],
            [copy.stats.sent, data.sentLast30Days],
          ].map(([label, value], i) => (
            <div key={label} className={`p-5 md:p-6 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
              <dt className="text-[0.9375rem] text-ink-soft">{label}</dt>
              <dd className="tabular mt-1 font-display-tight text-[2.25rem] leading-none font-extrabold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Panel title={copy.check.title}>
            <p className="text-ink-soft">{copy.check.schedule}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[0.875rem] text-ink-soft">{copy.check.next}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{dateTime(nextCheck(now))} UK time</dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-ink-soft">{copy.check.last}</dt>
                <dd className="mt-0.5 font-semibold text-ink">
                  {lastCheck ? `${dateTime(lastCheck.at)}: ${lastCheck.sent} sent of ${lastCheck.alerts} checked` : "None yet"}
                </dd>
              </div>
            </dl>
            {data.checks.length ? (
              <Table label={copy.check.title} columns={copy.check.columns} className="mt-6">
                {data.checks.slice(0, 7).map((c) => (
                  <tr key={c.at}>
                    <Td>{dateTime(c.at)}</Td>
                    <Td num>{c.alerts}</Td>
                    <Td num>{c.routes}</Td>
                    <Td num>{c.sent}</Td>
                    <Td num>{c.failed ? <span className="font-semibold text-dear">{c.failed}</span> : 0}</Td>
                  </tr>
                ))}
              </Table>
            ) : (
              <p className="mt-6 rounded-xl bg-mist p-4 text-[0.9375rem] text-ink">{copy.check.never}</p>
            )}
          </Panel>

          <Panel title={copy.export.title}>
            <p className="text-ink-soft">{copy.export.text}</p>
            <ul className="mt-5 space-y-2">
              {exportLists.map((list) => (
                <li key={list}>
                  <a
                    href={`/api/admin/export?list=${list}`}
                    download
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 ring-1 ring-line hover:bg-mist hover:ring-ink/20"
                  >
                    <DownloadSimple className="size-5 shrink-0 text-action" aria-hidden />
                    <span>
                      <span className="block font-semibold text-ink">{copy.export.lists[list].label}</span>
                      <span className="block text-[0.875rem] text-ink-soft">{copy.export.lists[list].hint}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-mist p-4 text-[0.875rem] leading-relaxed text-ink">{copy.export.consent}</p>
          </Panel>
        </div>

        <Panel title={copy.find.title} id="find">
          <form action="/admin#find" method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="block flex-1 text-[0.9375rem] font-semibold text-ink">
              {copy.find.label}
              <input
                name="q"
                type="email"
                defaultValue={query}
                autoComplete="off"
                className="mt-2 block h-12 w-full rounded-xl bg-white px-4 font-normal text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-action"
              />
            </label>
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep">
              <MagnifyingGlass className="size-5" aria-hidden />
              {copy.find.button}
            </button>
          </form>
          {query && <Person query={query} data={data} />}
        </Panel>

        <Panel title={`${copy.alerts.title} (${data.alerts.length})`}>
          {data.alerts.length ? (
            <>
              <Table label={copy.alerts.title} columns={copy.alerts.columns}>
                {data.alerts.slice(0, PAGE_ROWS).map((a) => (
                  <tr key={a.id}>
                    <Td>
                      <EmailLink email={a.email} />
                    </Td>
                    <Td>{alertRouteName(a)}</Td>
                    <Td>{alertTrip(a)}</Td>
                    <Td num>{money(a.max, a.currency)}</Td>
                    <Td>{date(a.created)}</Td>
                    <Td>{a.sentAt ? `${date(a.sentAt)}, ${money(a.sentPrice ?? 0, a.currency)}` : copy.alerts.notSent}</Td>
                    <Td num>{a.sends ?? 0}</Td>
                  </tr>
                ))}
              </Table>
              {data.alerts.length > PAGE_ROWS && <Note>{copy.showing(PAGE_ROWS, data.alerts.length)}</Note>}
            </>
          ) : (
            <Empty>{copy.alerts.empty}</Empty>
          )}
        </Panel>

        <Panel title={`${copy.subscribers.title} (${data.subscribers.length})`}>
          {data.subscribers.length ? (
            <>
              <Table label={copy.subscribers.title} columns={copy.subscribers.columns}>
                {data.subscribers.slice(0, PAGE_ROWS).map((s) => (
                  <tr key={s.email}>
                    <Td>
                      <EmailLink email={s.email} />
                    </Td>
                    <Td>{dateTime(s.confirmedAt)}</Td>
                  </tr>
                ))}
              </Table>
              {data.subscribers.length > PAGE_ROWS && <Note>{copy.showing(PAGE_ROWS, data.subscribers.length)}</Note>}
            </>
          ) : (
            <Empty>{copy.subscribers.empty}</Empty>
          )}
          <Note>{copy.subscribers.earlier}</Note>
        </Panel>

        <Panel title={copy.activity.title}>
          {data.events.length ? (
            <>
              <EventTable events={data.events.slice(0, PAGE_ROWS)} withEmail />
              {data.events.length > PAGE_ROWS && <Note>{copy.showing(PAGE_ROWS, data.events.length)}</Note>}
            </>
          ) : (
            <Empty>{copy.activity.empty}</Empty>
          )}
          <Note>{copy.activity.retention}</Note>
        </Panel>
      </div>
    </>
  );
}

/** One person's record: what they signed up for and everything that happened. */
function Person({ query, data }: { query: string; data: Dashboard }) {
  const email = query.trim().toLowerCase();
  const person: Contact | undefined = data.contacts.find((c) => c.email === email);
  const events = data.events.filter((e) => e.email === email);
  if (!person && !events.length) return <p className="mt-6 rounded-xl bg-mist p-4 text-ink">{copy.find.none(email)}</p>;
  return (
    <div className="mt-6 space-y-6 border-t border-line pt-6" aria-label={`Record for ${email}`} role="region">
      <div>
        <h3 className="text-[1.125rem] font-bold break-all text-ink">{email}</h3>
        <p className="mt-1 text-ink-soft">
          {person?.fareAlertsSince ? `${copy.find.since} ${dateTime(person.fareAlertsSince)}` : copy.find.notSubscribed}
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-ink">{copy.find.alerts}</h4>
        {person?.alerts.length ? (
          <ul className="mt-2 space-y-1.5 text-ink">
            {person.alerts.map((a) => (
              <li key={a.id}>
                {alertRouteName(a)}, {alertTrip(a)}, below {money(a.max, a.currency)}.{" "}
                <span className="text-ink-soft">
                  Started {date(a.created)}; {a.sends ?? 0} emails sent{a.sentAt ? `, last on ${date(a.sentAt)}` : ""}.
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-ink-soft">{copy.find.noAlerts}</p>
        )}
      </div>
      <div>
        <h4 className="font-semibold text-ink">{copy.find.history}</h4>
        {events.length ? <EventTable events={events} className="mt-2" /> : <p className="mt-1 text-ink-soft">{copy.find.noHistory}</p>}
      </div>
      <DeletePerson email={email} />
    </div>
  );
}

function EventTable({ events, withEmail, className }: { events: ActivityEvent[]; withEmail?: boolean; className?: string }) {
  const columns = withEmail ? copy.activity.columns : copy.activity.columns.filter((c) => c !== "Email");
  return (
    <Table label={copy.activity.title} columns={columns} className={className}>
      {events.map((e, i) => (
        <tr key={`${e.at}-${i}`}>
          <Td>{dateTime(e.at)}</Td>
          {withEmail && (
            <Td>
              <EmailLink email={e.email} />
            </Td>
          )}
          <Td>{eventText[e.type]}</Td>
          <Td>{e.route ?? ""}</Td>
          <Td num>{e.price !== undefined && e.currency ? money(e.price, e.currency) : ""}</Td>
        </tr>
      ))}
    </Table>
  );
}

const EmailLink = ({ email }: { email: string }) => (
  <a href={`/admin?q=${encodeURIComponent(email)}#find`} className="font-medium break-all text-action underline-offset-2 hover:underline">
    {email}
  </a>
);

function Panel({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="min-w-0 scroll-mt-6 rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <h2 className="mb-3 font-display-tight text-[1.375rem] leading-tight font-extrabold text-ink">{title}</h2>
      {children}
    </section>
  );
}

/** Sideways-scrolling on narrow screens; focusable so keyboard users can scroll it too. */
function Table({ label, columns, className = "", children }: { label: string; columns: readonly string[]; className?: string; children: ReactNode }) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className={`relative -mx-1 overflow-x-auto px-1 ${className}`}>
      <table className="w-full min-w-max border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b border-line text-[0.8125rem] text-ink-soft">
            {columns.map((c) => (
              <th key={c} scope="col" className="py-2 pr-6 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/70">{children}</tbody>
      </table>
    </div>
  );
}

const Td = ({ num, children }: { num?: boolean; children: ReactNode }) => (
  <td className={`py-2.5 pr-6 align-top text-ink ${num ? "tabular" : ""}`}>{children}</td>
);

const Empty = ({ children }: { children: ReactNode }) => <p className="rounded-xl bg-mist p-4 text-[0.9375rem] text-ink">{children}</p>;
const Note = ({ children }: { children: ReactNode }) => <p className="mt-3 text-[0.875rem] text-ink-soft">{children}</p>;
