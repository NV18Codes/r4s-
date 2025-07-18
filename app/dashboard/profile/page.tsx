"use client";
import { useAuth } from "../../AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const activities = [
    { text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting.", date: "04/03/25" },
    { text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting.", date: "04/03/25" },
    { text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting.", date: "04/03/25" },
    { text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting.", date: "04/03/25" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">Profile</h1>
        <button className="bg-[#005580] text-white px-4 py-2 rounded">Edit Profile</button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="profile-sidebar p-6 flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-300 rounded-full overflow-hidden mb-4"></div>
            <h2 className="text-xl font-medium mb-1">{user ? `${user.firstName} ${user.lastName}` : "-"}</h2>
            <p className="text-sm mb-4">{user?.role || "-"}</p>

            <div className="bg-white text-[#005580] px-4 py-1 rounded-full mb-8">{user?.role || "-"}</div>

            <div className="w-full border-t border-white/20 my-4"></div>

            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{user?.address || "-"}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{user?.emailId || "-"}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{user?.phoneNumber || "-"}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{user?.organizationId || "-"}</span>
              </div>
            </div>

    

           
          </div>

          <div className="md:col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-[#005580]">Recent Activity</h2>
              <button className="flex items-center gap-1 text-[#005580] border border-[#005580] px-3 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                View All
              </button>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-start gap-4 ${index % 2 === 0 ? "bg-blue-50" : ""}`}
                >
                  <div className="h-10 w-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-grow">
                    <p className="text-gray-600">{activity.text}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
