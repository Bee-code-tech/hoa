import { Phone, MessageSquare, Mail } from "lucide-react";

function SupportSection() {
  const supportOptions = [
    { label: "Call Us", icon: <Phone className="w-8 h-8 mx-auto mb-4 text-teal-600" /> },
    { label: "Live Chat", icon: <MessageSquare className="w-8 h-8 mx-auto mb-4 text-teal-600" /> },
    { label: "Email Us", icon: <Mail className="w-8 h-8 mx-auto mb-4 text-teal-600" /> },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center items-center ">
        <h2 className="text-2xl font-bold mb-2">Need To Contact Us?</h2>
        <p className="text-gray-600 mb-10">
          Our support team is available Monday to Friday - 9:00 AM to 5:30 PM. For help after hours, visit our Contact Us page.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {supportOptions.map((option) => (
            <div key={option.label} className="border rounded-xl p-6 bg-white flex flex-col items-center text-blue-900">
              {option.icon}
              <p className="font-medium">{option.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
