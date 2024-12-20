import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Heart, 
  Target, 
  Eye, 
  CheckCircle2, 
  Users, 
  Scale, 
  Shield, 
  Gem,
  Clock
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction in everything we do."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "We guarantee authentic parts and maintain the highest standards of quality."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Reliability",
      description: "We deliver on our promises and ensure timely service to our customers."
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for excellence in our products, service, and customer support."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "We are passionate about providing the best auto parts solutions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Zawabu Auto</title>
        <meta 
          name="description" 
          content="Learn about Zawabu Auto's mission, vision, and values. Your trusted partner in quality auto parts."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-brand-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zawabu Auto</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your trusted partner in quality auto parts and exceptional service
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            Since our establishment, Zawabu Auto has been committed to providing high-quality auto parts 
            and exceptional service to our customers. We understand the importance of reliable parts in 
            keeping your vehicle running smoothly and safely.
          </p>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-brand-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide our customers with high-quality, reliable auto parts and exceptional service 
              that keeps their vehicles running at peak performance. We strive to make finding and 
              purchasing auto parts a seamless experience through our expertise and commitment to 
              customer satisfaction.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-brand-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading auto parts supplier in Kenya, recognized for our comprehensive 
              inventory, technical expertise, and unwavering commitment to customer service. We aim 
              to be at the forefront of automotive innovation while maintaining our core values of 
              quality and reliability.
            </p>
          </div>

          {/* Values Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-brand-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Our values guide every decision we make and every interaction we have. They are the 
              foundation of our commitment to excellence and the driving force behind our success 
              in serving our customers.
            </p>
          </div>
        </div>

        {/* Detailed Values Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-brand-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {React.cloneElement(value.icon, { className: "text-brand-blue-500" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-brand-blue-500 text-white rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-6">
            Browse our extensive catalog of quality auto parts or contact our team for expert assistance.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/products" 
              className="bg-white text-brand-blue-500 px-6 py-3 rounded-lg font-medium 
                hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </a>
            <a 
              href="/contact" 
              className="bg-brand-green-500 text-white px-6 py-3 rounded-lg font-medium 
                hover:bg-brand-green-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;