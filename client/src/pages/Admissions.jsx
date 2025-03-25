import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiDownload, FiArrowRight, FiHelpCircle } from 'react-icons/fi';

const Admissions = () => {

  window.scrollTo(0, 0);

  const [activeTab, setActiveTab] = useState('process');
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Admission Process Steps
  const admissionSteps = [
    {
      icon: "📋",
      title: "Submit Application",
      description: "Complete and submit the online application form along with necessary documents.",
      timeframe: "Start of academic year"
    },
    {
      icon: "💰",
      title: "Application Fee Payment",
      description: "Pay the non-refundable application processing fee.",
      timeframe: "Within 3 days of application"
    },
    {
      icon: "📝",
      title: "Entrance Examination",
      description: "Candidates must appear for the entrance examination on the scheduled date.",
      timeframe: "Scheduled after application review"
    },
    {
      icon: "👥",
      title: "Interview",
      description: "Shortlisted candidates and their parents will be called for an interview.",
      timeframe: "1-2 weeks after entrance exam"
    },
    {
      icon: "📬",
      title: "Results & Offer",
      description: "Admission offers will be sent to successful candidates via email.",
      timeframe: "Within 2 weeks of interview"
    },
    {
      icon: "✅",
      title: "Fee Payment & Confirmation",
      description: "Pay the admission fee to confirm enrollment.",
      timeframe: "Within 7 days of offer"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Admission requirements include completed application form, previous academic records, birth certificate, passport-sized photographs, and successful completion of the entrance examination and interview."
    },
    {
      question: "What grades/classes are open for admission?",
      answer: "We offer admissions from Kindergarten to Grade 12. Specific grade openings may vary based on availability for the current academic year."
    },
    {
      question: "Is there an entrance examination?",
      answer: "Yes, all applicants from Grade 1 onwards are required to take an entrance examination that evaluates their proficiency in English, Mathematics, and logical reasoning. Kindergarten admissions involve an informal assessment."
    },
    {
      question: "What is the fee structure?",
      answer: "Our fee structure varies by grade level. It includes a one-time admission fee, annual tuition fees that can be paid quarterly or annually, and additional fees for extracurricular activities, transportation, and learning materials."
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes, we offer merit-based scholarships for exceptionally talented students. These scholarships can cover up to 50% of the tuition fees based on academic excellence, sports achievements, or extraordinary talent in arts."
    },
    {
      question: "What is the student-teacher ratio?",
      answer: "We maintain a low student-teacher ratio of 20:1 to ensure personalized attention for each student and to create an optimal learning environment."
    },
    {
      question: "Is mid-year admission possible?",
      answer: "Yes, mid-year admissions are possible subject to seat availability. The standard admission process applies, but decisions are typically expedited."
    }
  ];

  // Important dates
  const importantDates = [
    {
      event: "Application Portal Opens",
      date: "January 15, 2024",
      description: "Online application portal opens for the next academic year"
    },
    {
      event: "Open House",
      date: "February 10, 2024",
      description: "Campus tour and information session for prospective students and parents"
    },
    {
      event: "Application Deadline",
      date: "March 31, 2024",
      description: "Last date to submit applications for the upcoming academic year"
    },
    {
      event: "Entrance Examinations",
      date: "April 15-20, 2024",
      description: "Scheduled entrance examinations for all applicants"
    },
    {
      event: "Results Announcement",
      date: "May 10, 2024",
      description: "Admission results will be announced via email"
    },
    {
      event: "Fee Payment Deadline",
      date: "May 31, 2024",
      description: "Last date to pay the admission fee to confirm enrollment"
    },
    {
      event: "Orientation Program",
      date: "July 5, 2024",
      description: "Orientation for new students and parents"
    },
    {
      event: "Academic Year Begins",
      date: "July 10, 2024",
      description: "First day of the new academic year"
    }
  ];

  // Required documents
  const requiredDocuments = [
    "Completed application form",
    "Birth certificate (original and photocopy)",
    "Previous academic records/report cards for the last two years",
    "Transfer certificate from previous school (if applicable)",
    "4 recent passport-sized photographs",
    "Proof of residence (utility bill/rental agreement)",
    "ID proof of parents/guardians",
    "Medical fitness certificate",
    "Special needs documentation (if applicable)"
  ];

  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-primary-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-#FFAB00 mb-4"
          >
            Admissions
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-#FFAB00 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-primary-100 text-lg max-w-2xl mx-auto"
          >
            Join our community of learners and embark on a journey of academic excellence and holistic development
          </motion.p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 gap-2">
            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'process'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Admission Process
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'fees'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Fee Structure
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'dates'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Important Dates
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'documents'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Required Documents
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'faq'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              FAQs
            </button>
            {/*}
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 font-medium #FFAB00space-nowrap transition-colors ${
                activeTab === 'apply'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Apply Now
            </button>
            */}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Admission Process */}
          {activeTab === 'process' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {admissionSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-full text-#FFAB00 text-2xl">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{step.timeframe}</p>
                    </div>
                  </div>
                ))}
              </div>    
            </motion.div>
         )}
         
          {/* Fee Structure */}
          {activeTab === 'fees' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Fee Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Tuition Fees</h3>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla ac justo ultrices ultricies.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-4">
                    <li>Kindergarten: $5,000 per annum</li>
                    <li>Primary School: $7,500 per annum</li>
                    <li>Middle School: $9,000 per annum</li>
                    <li>High School: $10,500 per annum</li>
                  </ul>
                </div>
                <div className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Additional Fees</h3>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla ac justo ultrices ultricies.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-4">
                    <li>Admission Fee: $500 (one-time)</li>
                    <li>Extracurricular Activities: $100 per term</li>
                    <li>Transportation: $50 per month</li>
                    <li>Learning Materials: $200 per annum</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Important Dates */}
          {activeTab === 'dates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Important Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {importantDates.map((date, index) => (
                  <div key={index} className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{date.event}</h3>
                    <p className="text-gray-600 mt-2">{date.date}</p>
                    <p className="text-gray-600 mt-2">{date.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Required Documents */}
            {activeTab === 'documents' && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Required Documents</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {requiredDocuments.map((document, index) => (
                    <li key={index}>{document}</li>
                    ))}
                </ul>
                </motion.div>
            )}
    
            {/* FAQs */}
            {activeTab === 'faq' && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                    <div key={index} className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                    </div>
                    ))}
                </div>
                </motion.div>
            )}
    
            {/* Apply Now */}
            {activeTab === 'apply' && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Apply Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">Admission Form</h3>
                    <p className="text-gray-600 mt-2">
                        Complete the online application form to apply for admission.
                    </p>
                    <Link
                        to="/admissions/apply"
                        className="inline-block mt-4 px-6 py-3 bg-primary-600 text-#FFAB00 rounded-lg hover:bg-primary-700"
                    >
                        Apply Now
                    </Link>
                    </div>
                    <div className="bg-#FFAB00 shadow-md p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">Contact Admissions</h3>
                    <p className="text-gray-600 mt-2">
                        For any queries or assistance with the application process, contact our admissions team.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block mt-4 px-6 py-3 bg-primary-600 text-#FFAB00 rounded-lg hover:bg-primary-700"
                    >
                        Contact Us
                    </Link>
                    </div>
                </div>
                </motion.div>
            )}
        </div>
      </section>
     
         {/* Calendar Download Section */}
      <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
            Download Our Academic Calendar
          </h2>
          <p className="text-gray-600 mb-6">
            Get all important dates and events for the academic year in one place. Our calendar includes all holidays, examination schedules, and special events.
          </p>
          <button className="px-8 py-3 bg-primary-600 text-#FFAB00 font-medium rounded-md hover:bg-primary-700 transition-colors">
            Download Calendar
          </button>
        </div>
      </div>
    </section>



    </div>
    );
}

export default Admissions;