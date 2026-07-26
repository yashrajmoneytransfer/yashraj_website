"use client";

import { useState, useEffect } from "react";

interface QuoteForm {
  name: string;
  mobile: string;
  email: string;
  country: string;
  currency: string;
  amount: string;
  purpose: string;
}

// 1. props ద్వారా selectedService ని తీసుకోవడానికి interface ని యాడ్ చేశాం
interface GetQuoteSectionProps {
  selectedService?: string;
}

export function GetQuoteSection({ selectedService }: GetQuoteSectionProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialForm: QuoteForm = {
    name: "",
    mobile: "",
    email: "",
    country: "",
    currency: "",
    amount: "",
    purpose: "",
  };

  const [formData, setFormData] = useState<QuoteForm>(initialForm);

  // 2. సర్వీస్ కార్డ్ క్లిక్ చేసినప్పుడు `purpose` ఆటోమేటిక్‌గా అప్‌డేట్ అవ్వడానికి useEffect వాడాం
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        purpose: selectedService,
      }));
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            amount: Number(formData.amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote.");
      }

      setMessage("✅ Quote request submitted successfully.");

      setFormData(initialForm);
    } catch (error: any) {
      console.error(error);

      setMessage(
        error.message || "❌ Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="get-quote" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4">

        <h2 className="text-4xl font-bold text-center mb-10">
          Get Free Forex Quote
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="tel"
            name="mobile"
            required
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="text"
            name="country"
            required
            placeholder="Destination Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="text"
            name="currency"
            required
            placeholder="Currency (USD / EUR / GBP)"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            type="number"
            name="amount"
            required
            min="1"
            step="0.01"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <select
            name="purpose"
            required
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          >
            <option value="">Select Purpose</option>
            <option value="Foreign Currency Exchange">Foreign Currency Exchange</option>
            <option value="Travel Forex">Travel Forex</option>
            <option value="Student Forex">Student Forex</option>
            <option value="Forex Cards">Forex Cards</option>
            <option value="Business Currency Exchange">Business Currency Exchange</option>
            <option value="Currency Remittance Guidance">Currency Remittance Guidance</option>
            <option value="University Fee">University Fee</option>
            <option value="Business Payment">Business Payment</option>
            <option value="Medical Treatment">Medical Treatment</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Get Free Quote"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 text-center font-semibold ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
}