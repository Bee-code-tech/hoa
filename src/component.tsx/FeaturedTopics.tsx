function FeaturedTopics() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Topics</h2>

        <div className="grid md:grid-cols-2 gap-10 text-lg">
          {/* Column 1 */}
          <div className="space-y-6">
            {/* Construction */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">Construction</h4>
              <div className="flex flex-wrap gap-3 text-xl">
                <a href="#" className="text-blue-600 hover:underline">
                  SMSTS
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  SSSTS
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  CSCS
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  IOSH
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Banksman
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  NEBOSH
                </a>
              </div>
            </div>

            {/* First Aid */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">First Aid</h4>
              <div className="flex flex-wrap gap-3 text-xl">
                <a href="#" className="text-blue-600 hover:underline ">
                  Emergency
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Paediatric
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Mental Health
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Workplace
                </a>
              </div>
            </div>

            {/* Security */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">Security</h4>
              <div className="flex flex-wrap gap-3 text-xl">
                <a href="#" className="text-blue-600 hover:underline">
                  Door Supervisor
                </a>
                <a href="#" className="text-blue-600 hover:underline">
               Top up for Door Supervisor
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Security Guards
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                 Top up for Security Guard
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  CCTV Operator
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Crowd Safety
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Close Protection
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Top up For Close Protection
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  SIA Trainers
                </a> 
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Health & Safety */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">Health & Safety</h4>
              <div className="flex flex-wrap gap-3 text-xl">
                <a href="#" className="text-blue-600 hover:underline">
                  Risk Assessment
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Fire Safety
                </a>
                <a href="#" className="text-blue-600 hover:underline">
               Asbestos Awareness
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Manual Handling
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Health and Safety in Workplace
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  CITB Site Safety Plus
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  IOSH
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  NEBOSH
                </a>
              </div>
            </div>

            {/* Healthcare */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">Healthcare</h4>
              <div className="flex flex-wrap gap-3 text-xl">
               
                <a href="#" className="text-blue-600 hover:underline">
                  Care 
                </a>
               
              </div>
            </div>

            {/* Hospitality */}
            <div>
              <h4 className="font-bold mb-2 text-2xl">Hospitality</h4>
              <div className="flex flex-wrap gap-3 text-xl">
                <a href="#" className="text-blue-600 hover:underline">
                 personal License
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Scottish Personal License
                </a>
               
                <a href="#" className="text-blue-600 hover:underline">
                 Food Hygiene
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTopics;
