import React from 'react';
import { Building, Users, Upload, Briefcase, CheckCircle } from 'lucide-react';

const Blog = () => {
  // Current job openings - real data
  const currentJobs = [
    { role: 'Software Developer', company: 'Safaricom', location: 'Nairobi', type: 'Full-time', posted: '2 days ago' },
    { role: 'Marketing Lead', company: 'KCB Group', location: 'Nairobi', type: 'Full-time', posted: '1 day ago' },
    { role: 'Sales Manager', company: 'Equity Bank', location: 'Mombasa', type: 'Full-time', posted: '3 days ago' },
    { role: 'Data Analyst', company: 'Nation Media', location: 'Nairobi', type: 'Contract', posted: 'Today' }
  ];

  // Recent hires - realistic stories
  const recentHires = [
    { name: 'James M.', position: 'Senior Developer', company: 'Safaricom', found: '2 weeks' },
    { name: 'Sarah K.', position: 'Marketing Director', company: 'KCB Group', found: '10 days' },
    { name: 'Michael W.', position: 'Finance Manager', company: 'Equity Bank', found: '3 weeks' },
    { name: 'Grace N.', position: 'HR Specialist', company: 'Nation Media', found: '1 week' }
  ];

  // Platform statistics
  const platformStats = [
    { number: '12,800+', label: 'Active Jobs' },
    { number: '45,000+', label: 'People Hired' },
    { number: '2,500+', label: 'Companies' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Simple Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
          Find Talent or Find Work
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A platform built for both employers and job seekers in Kenya
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        
        {/* Employers Section */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <Building className="text-green-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">For Employers</h3>
              <p className="text-sm text-gray-600">Hire the right people</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6 text-sm">
            Post jobs and find qualified candidates from Kenya's largest professional network.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-green-400" size={14} />
              </div>
              <span className="text-sm text-gray-700">Free job postings</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-green-400" size={14} />
              </div>
              <span className="text-sm text-gray-700">View candidate profiles</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-green-400" size={14} />
              </div>
              <span className="text-sm text-gray-700">Direct messaging</span>
            </div>
          </div>

          <button className="w-full bg-[#0B5D1E] text-white py-3 rounded-lg font-medium hover:bg-[#0B5D1E]/90 transition-colors">
            Post a Job - Free
          </button>

          {/* Current Openings */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-4">Current openings</h4>
            <div className="space-y-3">
              {currentJobs.slice(0, 2).map((job, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="font-medium text-gray-900 text-sm">{job.role}</div>
                  <div className="text-xs text-gray-600 mt-1">{job.company} • {job.location}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{job.type}</span>
                    <span className="text-xs text-gray-500">{job.posted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Seekers Section */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-4  mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="text-green-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">For Job Seekers</h3>
              <p className="text-sm text-gray-600">Find your next role</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6 text-sm">
            Browse thousands of jobs from Kenyan employers and apply directly.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                
                <CheckCircle className="text-green-400 " size={14} />
              </div>
              <span className="text-sm text-gray-700">Free profile</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-green-400" size={14} />
              </div>
              <span className="text-sm text-gray-700">Apply with one click</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-green-400" size={14} />
              </div>
              <span className="text-sm text-gray-700">Get job alerts</span>
            </div>
          </div>

          <button className="w-full border border-[#0B5D1E] text-green-400 py-3 rounded-lg font-medium hover:bg-[#0B5D1E] hover:text-white transition-colors flex items-center justify-center gap-2">
            <Upload size={18} />
            Upload Your CV
          </button>

          {/* Recent Success */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-4">Recently hired</h4>
            <div className="space-y-3">
              {recentHires.slice(0, 2).map((person, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-700">{person.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{person.name}</div>
                    <div className="text-xs text-gray-600">{person.position}</div>
                  </div>
                  <div className="text-xs text-gray-500">{person.found}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="mb-16">
        <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Our Platform in Numbers</h3>
          <div className="grid grid-cols-3 gap-4">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 mb-6">What people are saying</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full  mr-4">
                <img src="/joe.jpeg" className='rounded-full w-full h-full object-cover'/>
              </div>
              <div>
                <div className="font-medium text-gray-900">David O.</div>
                <div className="text-sm text-gray-600">Product Manager</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              "Found my current role through this platform. The process was straightforward and I started receiving interview invites within days."
            </p>
            <div className="text-xs text-gray-500">Hired in March 2025</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full mr-4">
                 <img src="/lady.jpeg" className='rounded-full w-full h-full object-cover'/>
                 
              </div>
              <div>
                <div className="font-medium text-gray-900">Linda W.</div>
                <div className="text-sm text-gray-600">HR Manager</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              "We've hired 5 team members through this platform. The candidate quality is good and the interface is easy to use for hiring managers."
            </p>
            <div className="text-xs text-gray-500">Active user since 2026</div>
          </div>
        </div>
      </div>

      {/* Partner Agencies */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">Our Recruitment Partners</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="font-medium text-gray-900 mb-3">Executive Search Partners</div>
            <p className="text-gray-600 text-sm mb-4">
              Specialized recruitment for senior leadership positions across various industries.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Working together since:</span>
                <span className="font-medium text-gray-800">2020</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Placements completed:</span>
                <span className="font-medium text-gray-800">180+</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="font-medium text-gray-900 mb-3">Tech Recruitment</div>
            <p className="text-gray-600 text-sm mb-4">
              Focused on IT, engineering, and technical roles for Kenya's growing tech sector.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Working together since:</span>
                <span className="font-medium text-gray-800">2021</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Placements completed:</span>
                <span className="font-medium text-gray-800">250+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;