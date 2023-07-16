import {Button, Logo} from "@/components/common";
import TextField from "@/components/common/TextField/TextField";
import Image from "next/image";
import Router from "next/router";
import {ChangeEvent} from "react";

const LoginPage = () => {
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    Router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center h-screen gap-8 py-8 bg-gray-100 sm:py-0 sm:justify-center">
      <div className="opacity-60">
        <Logo width={80} height={80} />
      </div>

      <div className="w-full px-8 py-6 sm:shadow sm:bg-white sm:rounded-lg sm:max-w-md">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <TextField
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your email address"
                required
                maxLength={40}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium">
                Pasword
              </label>
              <div className="relative">
                <TextField
                  type="password"
                  id="password"
                  className="pr-10"
                  placeholder="Enter your password"
                  maxLength={16}
                  required
                />
                <button type="button" className="absolute top-3 right-2">
                  <Image
                    className="opacity-70"
                    src="/icons/eye-open.svg"
                    // TODO: Toggle password field
                    // src="/icons/eye-closed.svg"
                    width={20}
                    height={20}
                    alt="Show password"
                  />
                </button>
              </div>
            </div>

            <div className="mt-2 place-self-end">
              <Button>Log in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
