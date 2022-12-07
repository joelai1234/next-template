export default function StoreCreate() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4);',
      }}
    >
      <div className="block max-w-xl rounded-lg border border-gray-200 bg-white px-12 pt-16 pb-11 shadow-2xl hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          What would you like to name your store?
        </h5>
        <p className="font-normal text-gray-700">
          You can skip this for now if you&apos;re still working on it.
        </p>
        <div className="mt-4">
          <label className="block font-medium text-gray-700">Store name</label>
          <div className="mt-1">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-14 flex justify-end">
          <button
            type="button"
            className="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Skip
          </button>
          <button
            type="button"
            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
