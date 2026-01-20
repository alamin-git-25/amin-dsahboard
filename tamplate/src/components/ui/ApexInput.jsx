import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

export default function ApexInput({ label, errors, name, Icon, type, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="mb-2 w-full">
            <label className="block text-md mb-.5 text-(--text)">
                {label}
            </label>

            <div className="relative">
                {/* Left Icon */}
                <span className="w-10 shadow-(--bs) text-white h-full bg-(--icon) absolute left-0 top-0 flex justify-center items-center">
                    {Icon ? (
                        <Icon size={18} />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                            />
                        </svg>
                    )}
                </span>

                {/* Input */}
                <input
                    name={name}
                    type={isPassword && showPassword ? "text" : type}
                    className="
            w-full border border-(--border)
            px-3 py-2 inset-shadow-sm
            pl-12 pr-10 h-9
            focus:outline-0
          "
                    {...props}
                />

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        tabIndex={-1}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {errors && errors?.[name] && (
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => (
                        <p className="text-red-400 flex items-center gap-1 mt-1 text-sm">
                            <CircleAlert size={16} />
                            {message === "Required" ? "This field is required" : message}
                        </p>
                    )}
                />
            )}
        </div>
    );
}
