import { expect, test } from "@playwright/test";
import { affiliateUrl, isProgramUrl } from "../../src/lib/affiliate";
import { dealLink } from "../../src/lib/deal-links";

// Pure link-format checks (no browser). Samples were generated with the
// Travelpayouts dashboard link generator ("Full link" view), 14 Oct 2026.
test.describe.configure({ mode: "parallel" });

const samples = [
  ["aviasales", "https://www.aviasales.com/search/LON1503NYC20031", "deals_rail", "https://tp.media/r?campaign_id=100&marker=567389&p=4114&sub_id=deals_rail&trs=344771&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FLON1503NYC20031"],
  ["tiqets", "https://www.tiqets.com/", "sample", "https://tp.media/r?campaign_id=89&marker=567389&p=2074&sub_id=sample&trs=344771&u=https%3A%2F%2Fwww.tiqets.com%2F"],
  ["airalo", "https://www.airalo.com/", "sample", "https://tp.media/r?campaign_id=541&marker=567389&p=8310&sub_id=sample&trs=344771&u=https%3A%2F%2Fwww.airalo.com%2F"],
  ["economybookings", "https://www.economybookings.com/", "sample", "https://tp.media/r?campaign_id=10&marker=567389&p=2018&sub_id=sample&trs=344771&u=https%3A%2F%2Fwww.economybookings.com%2F"],
  ["kiwitaxi", "https://kiwitaxi.com/", "sample", "https://tp.media/r?campaign_id=1&marker=567389&p=647&sub_id=sample&trs=344771&u=https%3A%2F%2Fkiwitaxi.com%2F"],
  ["tripcom", "https://www.trip.com/hotels/", "sample", "https://tp.media/r?campaign_id=121&marker=567389&p=8980&sub_id=sample&trs=344771&u=https%3A%2F%2Fwww.trip.com%2Fhotels%2F"],
] as const;

for (const [program, url, sub, expected] of samples) {
  test(`${program} link matches the dashboard generator`, () => {
    expect(affiliateUrl(program, url, sub)).toBe(expected);
  });
}

test("sub IDs are sanitised", () => {
  expect(affiliateUrl("aviasales", "https://www.aviasales.com/", "Home Deals/London→Lisbon")).toContain("&sub_id=home_deals_london_lisbon&");
});

test("only program hosts are accepted for /go", () => {
  expect(isProgramUrl("aviasales", "https://www.aviasales.com/search/LON1503NYC20031")).toBe(true);
  expect(isProgramUrl("aviasales", "http://www.aviasales.com/")).toBe(false);
  expect(isProgramUrl("aviasales", "https://www.aviasales.com.evil.example/")).toBe(false);
});

test("deal buttons: affiliate link with a fare, White Label search without", () => {
  const withFare = dealLink({ link: "/search/LON2611LIS03121?t=abc" }, "LON", "LIS", "home_deals_london-to-lisbon");
  expect(withFare).toEqual({
    external: true,
    href: "https://tp.media/r?campaign_id=100&marker=567389&p=4114&sub_id=home_deals_london-to-lisbon&trs=344771&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FLON2611LIS03121%3Ft%3Dabc",
  });
  expect(dealLink(undefined, "LON", "LIS", "x")).toEqual({ external: false, href: "/flights?trip=round&cabin=economy&adults=1&from0=LON&to0=LIS&sub=x" });
});
