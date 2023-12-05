"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import useDebounce from "~/hooks/use-debounce";
import { api } from "~/trpc/react";

export default function UserInformationClientPage() {
  const [username, setUsername] = useState<string>("");
  const debounceUsername = useDebounce(username, 500);
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const changeUsernameMutation = api.user.changeUsername.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await changeUsernameMutation.mutateAsync({ username: debounceUsername });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkUsernameMutation = api.user.checkUsernameIsAvailable.useMutation({
    onSuccess(data) {
      if (data) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
        setError("The username is already taken");
      }
    },
  });

  const checkUsername = () => {
    checkUsernameMutation.mutate({ username: debounceUsername });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };

  useEffect(() => {
    if (username != "") {
      if (debounceUsername.length < 3) {
        setError("Username must be 3 characters or longer");
        setIsAvailable(false);
      } else {
        setError("");
        checkUsername();
      }
    } else {
      setError("Please enter a username");
      setIsAvailable(false);
    }
  }, [debounceUsername]);

  useEffect(() => {
    setError("");
  }, []);

  return (
    <div className=" flex min-h-screen bg-white">
      <div className=" w-full md:w-2/3">
        <div className=" flex justify-center p-10">
          <div className=" flex w-[640px] flex-col justify-center p-10 pt-28">
            <div className=" text-center">
              <h1 className=" text-[44px] font-bold">Welcome to Linkrd</h1>
              <p className=" text-gray-500">Choose your Linkrd username.</p>
            </div>
            <div className="">
              <div className=" mt-16 space-y-2">
                <div className=" h-12 w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-black hover:ring-2 hover:ring-gray-300 hover:focus-within:ring-2 hover:focus-within:ring-black">
                  <div className=" flex h-full items-center">
                    {/* <label htmlFor="" className=" ml-4 text-sm text-gray-500">
                      circle.link/
                    </label> */}
                    <input
                      type="text"
                      value={username}
                      onChange={handleChange}
                      id="username"
                      className=" h-12 w-full bg-transparent px-4 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                {error != "" && (
                  <p className=" text-sm text-red-700">{error}</p>
                )}
              </div>
              <p className=" mt-4 text-center text-sm text-gray-500">
                By continuing, you agree to receive offers, news and update from
                Linkrd.
              </p>
              <div className=" mt-8 flex flex-col items-center gap-y-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isAvailable || isLoading}
                  className=" flex h-12 w-full items-center justify-center rounded-full bg-violet-700 text-sm font-medium text-white disabled:bg-neutral-300"
                >
                  {isLoading ? <Loading /> : <p>Continue</p>}
                </button>
              </div>
            </div>
            {/* <p className=" mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className=" text-violet-700 underline">
                Login
              </Link>
            </p> */}
          </div>
        </div>
      </div>
      <div className=" hidden h-screen w-1/3 bg-violet-900 md:flex"></div>
    </div>
  );
}
