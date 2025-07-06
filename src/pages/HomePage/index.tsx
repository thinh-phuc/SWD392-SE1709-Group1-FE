export default function HomePage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mt-10 text-center text-2xl font-bold">
        Welcome to the Home Page
      </h1>
      <p className="mt-4 text-center">
        This is the main landing page of our application.
      </p>
      <div className="mt-6 flex justify-center">
        <img
          src="https://media.vov.vn/sites/default/files/styles/large/public/2025-03/1_151.jpg"
          alt="Home Page"
          className="w-1/2 rounded-lg shadow-lg"
        />
      </div>
      <p className="mt-4 text-center text-gray-600">
        Explore our features and get started with your journey!
      </p>
    </div>
  );
}
