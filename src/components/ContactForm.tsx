
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
    });
    
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div id="contact" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy">Contact Us</h2>
          <p className="mt-2 text-navy/70">We'd love to hear from you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-navy/80 mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy/80 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-desert" size={20} />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy/80 mb-2">Message</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-desert focus:ring-2 focus:ring-desert/20 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-navy to-desert text-white py-4 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <span>Send Message</span>
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
