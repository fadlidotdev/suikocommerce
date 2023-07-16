import {useMutationLogin} from "@/api/auth/mutations";
import {Button, Logo, PasswordField} from "@/components/common";
import TextField from "@/components/common/TextField/TextField";
import {createStorage} from "@/utils/storage";
import {zodResolver} from "@hookform/resolvers/zod";
import Router from "next/router";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import {z} from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one lowercase, one uppercase, and one number",
    ),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const mutationLogin = useMutationLogin();

  const onSubmit = (values: z.infer<typeof schema>) => {
    toast.promise(
      mutationLogin.mutateAsync(values, {
        onSuccess: (data) => {
          createStorage("accessToken", data.token);
          Router.push("/dashboard");
        },
      }),
      {
        loading: "Authenticating...",
        success: "Yay! Welcome back",
        error: "Invalid credentials",
      },
    );
  };

  return (
    <div className="flex flex-col items-center h-screen gap-8 py-8 bg-gray-100 sm:py-0 sm:justify-center">
      <div className="opacity-60">
        <Logo width={80} height={80} />
      </div>

      <div className="w-full px-8 py-6 sm:shadow sm:bg-white sm:rounded-lg sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <TextField
              type="text"
              id="username"
              label="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...register("username")}
            />

            <PasswordField
              id="password"
              label="Password"
              className="pr-10"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

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
