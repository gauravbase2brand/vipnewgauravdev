import React from "react";
import { useState } from "react";
import "../../terms-and-conditions/TermsConditions.css";
import Link from "next/link";

const PrivacyPolicyAccordion = () => {
  const [activeTerm1, setactiveTerm1] = useState("");
  const handleTerms1 = (value) => {
    if (activeTerm1 === value) {
      setactiveTerm1("");
    } else {
      setactiveTerm1(value);
    }
  };

  return (
    <div className="PrivacyPolicyAccordion-section-os main-terms-condition-ud">
      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-1-os")}
            className={
              activeTerm1 === "term-1-os" ? "tab-label active" : "tab-label"
            }
          >
            Website Visitors
          </label>
          <div
            className={
              activeTerm1 === "term-1-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Like most website operators, VIP NUMBER SHOP collects
              non-personally-identifying information of the sort that web
              browsers and servers typically make available, such as the browser
              type, language preference, referring site, and the date and time
              of each visitor request. VIP NUMBER SHOP&apos;s purpose in
              collecting non-personally identifying information is to better
              understand how VIP NUMBER SHOP&apos;s visitors use its website.
              From time to time, VIP NUMBER SHOP may release
              non-personally-identifying information in the aggregate, e.g., by
              publishing a report on trends in the usage of its website.
            </p>
            <p>
              VIP NUMBER SHOP also collects potentially personally-identifying
              information like Internet Protocol (IP) addresses for logged in
              users and for users leaving comments on
              <Link href="https://vipnumbershop.com" target="_blank" >
                https://vipnumbershop.com
              </Link>
              blog posts. VIP NUMBER SHOP only discloses logged in user and
              commenter IP addresses under the same circumstances that it uses
              and discloses personally-identifying information as described
              below.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-2-os")}
            className={
              activeTerm1 === "term-2-os" ? "tab-label active" : "tab-label"
            }
          >
            Gathering of Personally-Identifying Information
          </label>
          <div
            className={
              activeTerm1 === "term-2-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Certain visitors to VIP NUMBER SHOP&apos;s websites choose to
              interact with VIP NUMBER SHOP in ways that require VIP NUMBER SHOP
              to gather personally-identifying information. The amount and type
              of information that VIP NUMBER SHOP gathers depends on the nature
              of the interaction. For example, we ask visitors who sign up for a
              blog at
              <Link href={"https://vipnumbershop.com"} target="_blank">
                https://vipnumbershop.com
              </Link>
              to provide a username and email address.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-3-os")}
            className={
              activeTerm1 === "term-3-os" ? "tab-label active" : "tab-label"
            }
          >
            Security
          </label>
          <div
            className={
              activeTerm1 === "term-3-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              The security of your Personal Information is important to us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While we strive to
              use commercially acceptable means to protect your Personal
              Information, we cannot guarantee its absolute security.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-4-os")}
            className={
              activeTerm1 === "term-4-os" ? "tab-label active" : "tab-label"
            }
          >
            Advertisements
          </label>
          <div
            className={
              activeTerm1 === "term-4-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Ads appearing on our website may be delivered to users by
              advertising partners, who may set cookies. These cookies allow the
              ad server to recognize your computer each time they send you an
              online advertisement to compile information about you or others
              who use your computer. This information allows ad networks to,
              among other things, deliver targeted advertisements that they
              believe will be of most interest to you. This Privacy Policy
              covers the use of cookies by VIP NUMBER SHOP and does not cover
              the use of cookies by any advertisers.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-5-os")}
            className={
              activeTerm1 === "term-5-os" ? "tab-label active" : "tab-label"
            }
          >
            Links To External Sites
          </label>
          <div
            className={
              activeTerm1 === "term-5-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Our Service may contain links to external sites that are not
              operated by us. If you click on a third party link, you will be
              directed to that third party&apos;s site. We strongly advise you
              to review the Privacy Policy and terms and conditions of every
              site you visit.
            </p>
            <p>
              We have no control over, and assume no responsibility for the
              content, privacy policies or practices of any third party sites,
              products or services.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-6-os")}
            className={
              activeTerm1 === "term-6-os" ? "tab-label active" : "tab-label"
            }
          >
            <p>
              <Link href="https://vipnumbershop.com" target="_blank" >
                {`https://vipnumbershop.com `}
              </Link>
              uses Google AdWords for remarketing
            </p>
          </label>
          <div
            className={
              activeTerm1 === "term-6-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              <Link href="https://vipnumbershop.com" target="_blank" >
                {`https://vipnumbershop.com `}
              </Link>
              uses the remarketing services to advertise on third party websites
              (including Google) to previous visitors to our site. It could mean
              that we advertise to previous visitors who haven&apos;t completed
              a task on our site, for example using the contact form to make an
              enquiry. This could be in the form of an advertisement on the
              Google search results page, or a site in the Google Display
              Network. Third-party vendors, including Google, use cookies to
              serve ads based on someone&apos;s past visits. Of course, any data
              collected will be used in accordance with our own privacy policy
              and Google&apos;s privacy policy.
            </p>
            <p>
              You can set preferences for how Google advertises to you using the
              Google Ad Preferences page, and if you want to you can opt out of
              interest-based advertising entirely by cookie settings or
              permanently using a browser plugin.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-7-os")}
            className={
              activeTerm1 === "term-7-os" ? "tab-label active" : "tab-label"
            }
          >
            Protection of Certain Personally-Identifying Information
          </label>
          <div
            className={
              activeTerm1 === "term-7-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              VIP NUMBER SHOP discloses potentially personally-identifying and
              personally-identifying information only to those of its employees,
              contractors and affiliated organizations that (i) need to know
              that information in order to process it on VIP NUMBER SHOP&apos;s
              behalf or to provide services available at VIP NUMBER SHOP&apos;s
              website, and (ii) that have agreed not to disclose it to others.
              Some of those employees, contractors and affiliated organizations
              may be located outside of your home country; by using VIP NUMBER
              SHOP&apos;s website, you consent to the transfer of such
              information to them. VIP NUMBER SHOP will not rent or sell
              potentially personally-identifying and personally-identifying
              information to anyone. Other than to its employees, contractors
              and affiliated organizations, as described above, VIP NUMBER SHOP
              discloses potentially personally-identifying and
              personally-identifying information only in response to a subpoena,
              court order or other governmental request, or when VIP NUMBER SHOP
              believes in good faith that disclosure is reasonably necessary to
              protect the property or rights of VIP NUMBER SHOP, third parties
              or the public at large.
            </p>
            <p>
              If you are a registered user of
              <Link href="https://vipnumbershop.com" target="_blank" >
                https://vipnumbershop.com
              </Link>
              and have supplied your email address, VIP NUMBER SHOP may
              occasionally send you an email to tell you about new features,
              solicit your feedback, or just keep you up to date with
              what&apos;s going on with VIP NUMBER SHOP and our products. We
              primarily use our blog to communicate this type of information, so
              we expect to keep this type of email to a minimum. If you send us
              a request (for example via a support email or via one of our
              feedback mechanisms), we reserve the right to publish it in order
              to help us clarify or respond to your request or to help us
              support other users. VIP NUMBER SHOP takes all measures reasonably
              necessary to protect against the unauthorized access, use,
              alteration or destruction of potentially personally-identifying
              and personally-identifying information.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-8-os")}
            className={
              activeTerm1 === "term-8-os" ? "tab-label active" : "tab-label"
            }
          >
            Aggregated Statistics
          </label>
          <div
            className={
              activeTerm1 === "term-8-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              VIP NUMBER SHOP may collect statistics about the behavior of
              visitors to its website. VIP NUMBER SHOP may display this
              information publicly or provide it to others. However, VIP NUMBER
              SHOP does not disclose your personally-identifying information.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-9-os")}
            className={
              activeTerm1 === "term-9-os" ? "tab-label active" : "tab-label"
            }
          >
            Affiliate Disclosure
          </label>
          <div
            className={
              activeTerm1 === "term-9-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              This site uses affiliate links and does earn a commission from
              certain links. This does not affect your purchases or the price
              you may pay.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-10-os")}
            className={
              activeTerm1 === "term-10-os" ? "tab-label active" : "tab-label"
            }
          >
            Cookies
          </label>
          <div
            className={
              activeTerm1 === "term-10-os"
                ? "tab-content active"
                : "tab-content"
            }
          >
            <p>
              To enrich and perfect your online experience, VIP NUMBER SHOP uses
              "Cookies", similar technologies and services provided by
              others to display personalized content, appropriate advertising
              and store your preferences on your computer.
            </p>
            <p>
              A cookie is a string of information that a website stores on a
              visitor&apos;s computer, and that the visitor&apos;s browser
              provides to the website each time the visitor returns. VIP NUMBER
              SHOP uses cookies to help VIP NUMBER SHOP identify and track
              visitors, their usage of
              <Link href="https://vipnumbershop.com" target="_blank" >
                https://vipnumbershop.com
              </Link>
              , and their website access preferences. VIP NUMBER SHOP visitors
              who do not wish to have cookies placed on their computers should
              set their browsers to refuse cookies before using VIP NUMBER
              SHOP&apos;s websites, with the drawback that certain features of
              VIP NUMBER SHOP&apos;s websites may not function properly without
              the aid of cookies.
            </p>
            <p>
              By continuing to navigate our website without changing your cookie
              settings, you hereby acknowledge and agree to VIP NUMBER
              SHOP&apos;s use of cookies.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-11-os")}
            className={
              activeTerm1 === "term-11-os" ? "tab-label active" : "tab-label"
            }
          >
            E-commerce
          </label>
          <div
            className={
              activeTerm1 === "term-11-os"
                ? "tab-content active"
                : "tab-content"
            }
          >
            <p>
              Those who engage in transactions with VIP NUMBER SHOP – by
              purchasing VIP NUMBER SHOP&apos;s services or products, are asked
              to provide additional information, including as necessary the
              personal and financial information required to process those
              transactions. In each case, VIP NUMBER SHOP collects such
              information only insofar as is necessary or appropriate to fulfill
              the purpose of the visitor&apos;s interaction with VIP NUMBER
              SHOP. VIP NUMBER SHOP does not disclose personally-identifying
              information other than as described below. And visitors can always
              refuse to supply personally-identifying information, with the
              caveat that it may prevent them from engaging in certain
              website-related activities.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-12-os")}
            className={
              activeTerm1 === "term-12-os" ? "tab-label active" : "tab-label"
            }
          >
            Business Transfers
          </label>
          <div
            className={
              activeTerm1 === "term-12-os"
                ? "tab-content active"
                : "tab-content"
            }
          >
            <p>
              If VIP NUMBER SHOP, or substantially all of its assets, were
              acquired, or in the unlikely event that VIP NUMBER SHOP goes out
              of business or enters bankruptcy, user information would be one of
              the assets that is transferred or acquired by a third party. You
              acknowledge that such transfers may occur, and that any acquirer
              of VIP NUMBER SHOP may continue to use your personal information
              as set forth in this policy.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-13-os")}
            className={
              activeTerm1 === "term-13-os" ? "tab-label active" : "tab-label"
            }
          >
            Privacy Policy Changes
          </label>
          <div
            className={
              activeTerm1 === "term-13-os"
                ? "tab-content active"
                : "tab-content"
            }
          >
            <p>
              Although most changes are likely to be minor, VIP NUMBER SHOP may
              change its Privacy Policy from time to time, and in VIP NUMBER
              SHOP&apos;s sole discretion. VIP NUMBER SHOP encourages visitors
              to frequently check this page for any changes to its Privacy
              Policy. Your continued use of this site after any change in this
              Privacy Policy will constitute your acceptance of such change.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="tab">
          <label
            onClick={() => handleTerms1("term-14-os")}
            className={
              activeTerm1 === "term-14-os" ? "tab-label active" : "tab-label"
            }
          >
            Credit & Contact Information
          </label>
          <div
            className={
              activeTerm1 === "term-14-os"
                ? "tab-content active"
                : "tab-content"
            }
          >
            <p>
              If you have any questions about this Privacy Policy, please
              contact us via email or phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyAccordion;
