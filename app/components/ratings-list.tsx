import Image from 'next/image';
import Link from 'next/link';

export default function RatingsList() {
  const users = [
    {
      id: 1,
      name: 'Amro Adil Mohamedahmed Salman',
      role: 'GSA Student',
      rating: 2683,
      badgeColor: 'bg-green-500',
    },
    {
      id: 2,
      name: 'Marouane BENBETKA',
      role: 'GSC Student',
      rating: 2405,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 3,
      name: 'Abel Gebeyehu',
      role: 'GSC Student',
      rating: 2284,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 4,
      name: 'Kenenisa Alemayehu',
      role: 'G6E Head',
      rating: 2256,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 5,
      name: 'Merwan',
      role: 'GSA Student',
      rating: 2228,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 6,
      name: 'Merwan',
      role: 'GSA Student',
      rating: 2228,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 7,
      name: 'Merwan',
      role: 'GSA Student',
      rating: 2228,
      badgeColor: 'bg-purple-500',
    },
    {
      id: 8,
      name: 'Merwan',
      role: 'GSA Student',
      rating: 2228,
      badgeColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Ratings</h2>
        <Link
          href="#"
          className="text-green-500 hover:text-green-600 flex items-center gap-1"
        >
          <span>Visual</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3H8M3 3V8M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <p className="text-gray-600 mb-6">There are 1294 users with ratings</p>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/profilepic.jpg"
                  alt={`${user.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium border border-gray-200">
                  {user.id}
                </div>
              </div>
              <div>
                <p className="text-md">{user.name}</p>
                <div className="flex items-center gap-1">
                  <span
                    className={`w-4 h-4 rounded-full ${user.badgeColor}`}
                  ></span>
                  <span className="text-sm text-gray-600">{user.role}</span>
                </div>
              </div>
            </div>
            <div className="font-bold">{user.rating}</div>
          </div>
        ))}

        {/* View More Button */}
        <div className="pt-4">
          <Link
            href="#"
            className="block w-full text-center py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}