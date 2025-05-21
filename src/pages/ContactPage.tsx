
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container-custom py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team is always here to help.
          </p>
          <div className="w-24 h-1 bg-navy mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+11234567890" className="text-navy font-medium hover:underline">
                (123) 456-7890
              </a>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
              <a href="mailto:support@shoply.com" className="text-navy font-medium hover:underline">
                support@shoply.com
              </a>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Our headquarters</p>
              <address className="text-navy font-medium not-italic">
                123 Commerce St, Shopville, ST 12345
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <MessageSquare className="mr-2 text-navy" />
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide as much detail as possible..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-navy hover:bg-navy-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What are your shipping times?</h3>
                <p className="text-gray-600">
                  Most orders are processed within 1-2 business days. Standard shipping typically takes 3-5 business days, while express shipping can deliver your order in 1-2 business days.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How can I return an item?</h3>
                <p className="text-gray-600">
                  We offer a hassle-free 30-day return policy. Simply log into your account, navigate to your orders, and request a return. Once approved, you'll receive a return shipping label.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600">
                  Yes, we ship to most countries worldwide. International shipping times vary by location, typically taking 7-14 business days. Additional customs fees may apply.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How can I track my order?</h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive a confirmation email with a tracking number. You can also check the status of your order in your account dashboard.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Customer service" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
