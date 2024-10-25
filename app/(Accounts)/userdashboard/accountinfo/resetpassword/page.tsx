const ResetPassword = () => {
  return (
    <main className="averagescreen:w-[60%] mx-auto py-8 px-4">
      <form className="flex flex-col gap-6">
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Existing Password"
        />

        <input
          type="passowrd"
          name="confirm-password"
          id="confirm-password"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="New Password"
        />

        <div className="w-full justify-center flex">
          <button className="rounded-[10px] px-14 py-2 text-white bg-[#FE5B13] mx-auto my-6 sm:my-8">
            Reset Password
          </button>
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
