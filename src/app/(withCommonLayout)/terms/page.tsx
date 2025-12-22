import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms & Conditions | Food Book",
  description:
    "Read the Terms and Conditions for using Food Book, including food allergy disclaimers, international use, and user responsibilities.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Page Title */}
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-8 p-6 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-4">
            <p>
              Welcome to <strong>Food Book</strong>. These Terms and Conditions
              ("Terms") govern your access to and use of the Food Book platform,
              including food cards, menus, restaurant listings, and related
              services.
            </p>
            <p>
              By accessing or using Food Book, you agree to be bound by these
              Terms. If you do not agree, please discontinue use of the
              platform.
            </p>
          </section>

          <Separator />

          {/* About */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. About Food Book</h2>
            <p>
              Food Book is an international food discovery platform providing
              restaurant information, menus, food descriptions, and user
              content. Food Book does not prepare, cook, sell, or deliver food
              unless explicitly stated.
            </p>
          </section>

          <Separator />

          {/* Eligibility */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Eligibility</h2>
            <p>
              You must be at least 13 years old to use Food Book. If you are
              under 18, you must have parental or guardian consent.
            </p>
          </section>

          <Separator />

          {/* International Use */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              3. International Use & Legal Compliance
            </h2>
            <p>
              Food Book operates internationally. You are responsible for
              complying with local laws, food regulations, and consumer
              protection rules in your jurisdiction.
            </p>
          </section>

          <Separator />

          {/* Restaurant Info */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Restaurant & Menu Information
            </h2>
            <p>
              Menu items, prices, ingredients, and availability may change
              without notice. Food Book does not guarantee the accuracy or
              completeness of restaurant-provided information.
            </p>
          </section>

          <Separator />

          {/* Allergy Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-red-600">
              5. Food Allergy Disclaimer (Important)
            </h2>
            <p>
              Food Book does not guarantee that any food listed is free from
              allergens. Cross-contamination may occur during food preparation.
            </p>
            <ul className="list-disc pl-6 text-sm">
              <li>Nuts & peanuts</li>
              <li>Dairy</li>
              <li>Eggs</li>
              <li>Gluten / wheat</li>
              <li>Soy</li>
              <li>Fish & shellfish</li>
            </ul>
            <p>
              If you have allergies or medical conditions, always contact the
              restaurant directly before consuming food.
            </p>
          </section>

          <Separator />

          {/* Health */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              6. Health & Nutrition Disclaimer
            </h2>
            <p>
              Nutritional and dietary information is provided for informational
              purposes only and does not constitute medical advice.
            </p>
          </section>

          <Separator />

          {/* User Content */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. User-Generated Content</h2>
            <p>
              By submitting content such as reviews or images, you grant Food
              Book a worldwide, royalty-free license to use and display that
              content.
            </p>
          </section>

          <Separator />

          {/* Liability */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              8. Limitation of Liability
            </h2>
            <p>
              Food Book is not responsible for food quality, allergic reactions,
              health issues, or damages resulting from the use of the platform.
            </p>
          </section>

          <Separator />

          {/* Termination */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access to Food Book
              at any time for violations of these Terms or applicable laws.
            </p>
          </section>

          <Separator />

          {/* Updates */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of Food
              Book after changes indicates acceptance.
            </p>
          </section>

          <Separator />

          {/* Contact */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">11. Contact</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="text-sm">📧 support@foodbook.example</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
