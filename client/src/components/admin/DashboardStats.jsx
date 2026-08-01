import {
  Briefcase,
  Building2,
  Laptop,
  Building,
  Globe,
} from "lucide-react";

function DashboardStats({ internships = [] }) {
  const totalInternships = internships.length;

  const totalCompanies = new Set(
    internships.map((i) => i.company)
  ).size;

  const remoteJobs = internships.filter(
    (i) => i.mode === "Remote"
  ).length;

  const hybridJobs = internships.filter(
    (i) => i.mode === "Hybrid"
  ).length;

  const onsiteJobs = internships.filter(
    (i) => i.mode === "On-site"
  ).length;

  const cards = [
    {
      title: "Total Internships",
      value: totalInternships,
      icon: <Briefcase size={32} />,
      color: "bg-blue-600",
    },
    {
      title: "Companies",
      value: totalCompanies,
      icon: <Building2 size={32} />,
      color: "bg-green-600",
    },
    {
      title: "Remote Jobs",
      value: remoteJobs,
      icon: <Laptop size={32} />,
      color: "bg-purple-600",
    },
    {
      title: "Hybrid Jobs",
      value: hybridJobs,
      icon: <Globe size={32} />,
      color: "bg-yellow-500",
    },
    {
      title: "On-site Jobs",
      value: onsiteJobs,
      icon: <Building size={32} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/80">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className="text-white">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;