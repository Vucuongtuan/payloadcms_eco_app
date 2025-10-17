import CartIcon from "@/components/(cart)/CartIcon";

export function AuthButtons() {
  return (
    <div className="hidden md:flex justify-end items-center space-x-4 w-1/3 lg:w-1/4">
      <CartIcon />
      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
        Login
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
        Sign Up
      </button>
    </div>
  );
}
