import Link from "next/link";

interface GroupCardProps {
  name: string;
  code: string;
  members: number;
  timeSpent: number;
  avgRating: number;
}

const GroupCard = ({
  name,
  code,
  members,
  timeSpent,
  avgRating,
}: GroupCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="mb-16">
        <h2 className="text-lg font-medium text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-500">
          {code} • {members} Members
        </p>
      </div>

      <div className="flex">
        <div className="flex-1 border-r border-gray-200 pr-4">
          <p className="text-xs text-gray-500 mb-1">Time Spent</p>
          <p className="text-base font-medium">{timeSpent.toLocaleString()}</p>
        </div>
        <div className="flex-1 pl-4">
          <p className="text-xs text-gray-500 mb-1">Avg. Rating</p>
          <p className="text-base font-medium">{avgRating.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default function GroupsPage() {
  const groups = [
    {
      name: "AASTU Group 55",
      code: "G55",
      members: 24,
      timeSpent: 248890,
      avgRating: 1375,
    },
    {
      name: "Group 6 Remote Ramadan Group",
      code: "G6R",
      members: 0,
      timeSpent: 0,
      avgRating: 0,
    },
    {
      name: "Ghana Group 60",
      code: "G60",
      members: 37,
      timeSpent: 57538,
      avgRating: 1415,
    },
    {
      name: "Remote Group 6L",
      code: "G6L",
      members: 13,
      timeSpent: 37470,
      avgRating: 1398,
    },
    {
      name: "Remote Group 6K",
      code: "G6K",
      members: 12,
      timeSpent: 34411,
      avgRating: 1309,
    },
    {
      name: "Remote Group 6J",
      code: "G6J",
      members: 14,
      timeSpent: 45691,
      avgRating: 1359,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Groups</h1>
        <div className="flex gap-4 mb-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-800">
            All
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <GroupCard
            key={index}
            name={group.name}
            code={group.code}
            members={group.members}
            timeSpent={group.timeSpent}
            avgRating={group.avgRating}
          />
        ))}
      </div>
    </div>
  );
}
