import React, { useState } from 'react';
import { Calculator, FileText, Home, DollarSign, MessageCircle, Phone, Star, Shield, CreditCard, Users, BadgeCheck, Upload, ChevronDown, Book, PieChart, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EnhancedLoanWebsite = () => {
  // Initialize all state at the top
  const [activeTab, setActiveTab] = useState('calculators');
  
  // Borrower information state
  const [borrowerData, setBorrowerData] = useState({
    annualIncome: 75000,
    creditScore: 720,
    monthlyDebts: 2000,
    employmentStatus: 'Employed',
    existingLoans: 1500
  });

  // Loan details state
  const [loanDetails, setLoanDetails] = useState({
    homePrice: 400000,
    downPayment: 80000,
    loanAmount: 320000,
    interestRate: 4.5,
    loanTerm: 30
  });

  // Calculate DTI ratio
  const calculateDTI = () => {
    const monthlyIncome = borrowerData.annualIncome / 12;
    return ((borrowerData.monthlyDebts / monthlyIncome) * 100).toFixed(1);
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanDetails.loanAmount;
    const monthlyRate = (loanDetails.interestRate / 100) / 12;
    const numberOfPayments = loanDetails.loanTerm * 12;
    
    const payment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return payment.toFixed(2);
  };

  // Sample amortization data
  const generateAmortizationData = () => {
    const data = [];
    let balance = loanDetails.loanAmount;
    const monthlyRate = (loanDetails.interestRate / 100) / 12;
    const monthlyPayment = Number(calculateMonthlyPayment());
    
    for (let year = 1; year <= 5; year++) {
      const interest = balance * monthlyRate * 12;
      const principal = monthlyPayment * 12 - interest;
      balance -= principal;
      data.push({
        year: `Year ${year}`,
        principal: Number(principal.toFixed(2)),
        interest: Number(interest.toFixed(2)),
        balance: Number(balance.toFixed(2))
      });
    }
    return data;
  };

  const amortizationData = generateAmortizationData();

  // Sample ROI calculation
  const calculateROI = () => {
    const purchasePrice = loanDetails.homePrice;
    const downPayment = loanDetails.downPayment;
    const appreciationRate = 0.03; // 3% annual appreciation
    const years = 5;
    
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate, years);
    const investment = downPayment + (Number(calculateMonthlyPayment()) * 12 * years);
    const roi = ((futureValue - purchasePrice) / investment) * 100;
    
    return roi.toFixed(2);
  };

  // Sample blog posts
  const blogPosts = [
    {
      title: "First-Time Homebuyer's Guide",
      excerpt: "Everything you need to know about buying your first home...",
      date: "Feb 1, 2025"
    },
    {
      title: "Understanding Mortgage Rates",
      excerpt: "How interest rates affect your monthly payments...",
      date: "Jan 28, 2025"
    },
    {
      title: "The Benefits of Refinancing",
      excerpt: "When and why you should consider refinancing your home...",
      date: "Jan 25, 2025"
    }
  ];

  // Client dashboard component
  const ClientDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
              </div>
              <span className="text-sm font-medium">75% Complete</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Next Steps:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <BadgeCheck className="w-4 h-4 text-green-500 mr-2" />
                    Application Submitted
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck className="w-4 h-4 text-green-500 mr-2" />
                    Credit Check Complete
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-500 mr-2" />
                    Awaiting Document Review
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Required Documents:</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <span className="text-sm">Upload W-2</span>
                    <Upload className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <span className="text-sm">Upload Bank Statements</span>
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={amortizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="principal" stroke="#2563eb" name="Principal" />
                <Line type="monotone" dataKey="interest" stroke="#059669" name="Interest" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ROI Calculator component
  const ROICalculator = () => (
    <Card>
      <CardHeader>
        <CardTitle>Return on Investment Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Purchase Price</label>
              <input
                type="number"
                value={loanDetails.homePrice}
                onChange={(e) => setLoanDetails({...loanDetails, homePrice: Number(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Down Payment</label>
              <input
                type="number"
                value={loanDetails.downPayment}
                onChange={(e) => setLoanDetails({...loanDetails, downPayment: Number(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <Alert>
            <AlertDescription>
              Estimated 5-Year ROI: {calculateROI()}%
            </AlertDescription>
          </Alert>
          <p className="text-sm text-gray-600">
            *Based on 3% annual appreciation rate and current market conditions
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Resources section with blog posts
  const ResourcesSection = () => (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Resources & Insights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Book className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-blue-600 hover:text-blue-700">Read More</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Unlock Your Dream Home with Expert Mortgage Solutions</h1>
          <p className="text-xl mb-8">Personalized home loan options tailored to your financial goals. Fast, easy, and secure applications.</p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 relative group">
              Apply Now
              <span className="absolute -top-8 left-0 bg-white text-gray-800 text-sm p-2 rounded hidden group-hover:block">
                Takes less than 5 minutes!
              </span>
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700">
              Get Your Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* Calculator & Dashboard Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                className={`px-4 py-2 rounded-md ${activeTab === 'calculators' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setActiveTab('calculators')}
              >
                Calculators
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
            </div>
          </div>

          {activeTab === 'calculators' ? (
            <div className="grid md:grid-cols-2 gap-8">
              <ROICalculator />
              {/* Other calculators... */}
            </div>
          ) : (
            <ClientDashboard />
          )}
        </div>
      </section>

      {/* Resources Section */}
      <ResourcesSection />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2025 Your Trusted Mortgage Expert. All rights reserved.</p>
          <p className="text-sm">NMLS #123456 | Licensed in all 50 states</p>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLoanWebsite;
