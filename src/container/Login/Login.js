import { LockClosedIcon } from "@heroicons/react/solid";
import Logo from "../../components/Login/logo-01.png";

export default function Login({
  onClickHandler,
  formType,
  onChange,
  updateFormState,
  formState,
}) {
  const switchFormTypeHandler = () => {
    if (formState.formType === "signin") {
      updateFormState(() => ({
        ...formState,
        formType: "signup",
      }));
    }
    if (
      formState.formType === "signup" ||
      formState.formType === "confirmSignUp"
    ) {
      updateFormState(() => ({
        ...formState,
        formType: "signin",
      }));
    }
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={Logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {`${formType} to your account`}
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              onClickHandler();
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            {formType === "confirmSignUp" ? (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Verification Code XXXX
                  </label>
                  <input
                    id="authCode"
                    name="authCode"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Verification Code XXXX"
                    onChange={onChange}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {/* <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {formType}
              </button>
            </div>
            <div>
              Already a user?{" "}
              <span
                className="hover:text-indigo-400"
                onClick={switchFormTypeHandler}
              >
                {formState.formType === "signin" ? "Sign up" : "Sign In"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
