export default function AddUserPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#005580] mb-6">Add User Information</h1>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="role" className="block text-[#005580] font-medium mb-2">
              Select Role
            </label>
            <input
              type="text"
              id="role"
              placeholder="Search Role"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-[#005580] font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-[#005580] font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[#005580] font-medium mb-2">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email ID"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-[#005580] font-medium mb-2">
              Contact No
            </label>
            <input
              type="tel"
              id="contact"
              placeholder="Enter Number"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div>
            <label htmlFor="organisations" className="block text-[#005580] font-medium mb-2">
              Organisations
            </label>
            <input
              type="text"
              id="organisations"
              placeholder="Add Organisations"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-[#005580] font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Add Address"
              className="w-full p-3 border border-gray-200 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[#005580] font-medium mb-2">Add Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Upload Profile Picture"
                    className="flex-grow p-3 border border-gray-200 rounded-l"
                    readOnly
                  />
                  <button className="bg-[#005580] text-white px-6 py-3 rounded-r">Upload</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden"></div>
                <div className="flex flex-col">
                  <span className="text-sm">User-Profile.Png</span>
                  <button className="text-red-500 text-sm">×</button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-[#005580] text-white px-6 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
