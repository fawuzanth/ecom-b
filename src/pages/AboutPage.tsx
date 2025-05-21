
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container-custom py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About SHOPLY</h1>
          <div className="w-24 h-1 bg-navy mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2020, SHOPLY began with a simple mission: to create a shopping experience that combines quality, affordability, and convenience. What started as a small passion project has grown into a trusted destination for discerning shoppers.
            </p>
            <p className="text-gray-700 mb-6">
              Our founders saw a gap in the market for an online retailer that truly puts customers first. We believe that shopping should be enjoyable, straightforward, and transparent – without compromising on quality or breaking the bank.
            </p>
            <Link to="/products">
              <Button className="bg-navy hover:bg-navy-800">Shop Our Products</Button>
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Our story" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <Card className="bg-gray-50 mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do at SHOPLY.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600">
                  We personally vet all products to ensure they meet our strict standards for quality and durability.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Every decision we make puts the customer experience at the forefront, from site design to customer service.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
                <p className="text-gray-600">
                  We're committed to reducing our environmental impact through eco-friendly shipping materials and ethical sourcing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Our team" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Behind SHOPLY is a dedicated team of professionals passionate about creating the best shopping experience possible. From our product curators to our customer service representatives, everyone plays a crucial role in delivering the quality you expect.
            </p>
            <p className="text-gray-700 mb-6">
              We're a diverse group united by our commitment to excellence and customer satisfaction. Many of us are avid online shoppers ourselves, which helps us understand exactly what our customers are looking for.
            </p>
            <Link to="/contact">
              <Button className="bg-coral hover:bg-coral-400">Get In Touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
