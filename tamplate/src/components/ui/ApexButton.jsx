// import { Loader2 } from "lucide-react";

// /**
//  * @typedef {'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'subtle'} ButtonVariant
//  * @typedef {'sm' | 'md' | 'lg' | 'xs' | 'sl'} ButtonSize
//  * @typedef {'button' | 'submit' | 'reset' } ButtonType
//  */

// /**
//  * @param {Object} props
//  * @param {React.ReactNode} props.children
//  * @param {React.ComponentType} [props.Icon]
//  * @param {ButtonVariant} [props.variant]
//  * @param {ButtonSize} [props.size]
//  * @param {() => void} [props.action]
//  * @param {boolean} [props.disabled]
//  * @param {boolean} [props.loading]
//  * @param {ButtonType} [props.type]
//  */
// export default function ApexButton({
//   children,
//   Icon,
//   variant = "primary",
//   action,
//   size = "lg",
//   disabled = false,
//   loading = false,
//   type = "button",
// }) {
//   const baseStyles = `
//         inline-flex items-center justify-center
//         font-medium
//         transition
//         shadow-(--bs)
//         cursor-pointer
//         text-nowrap
//         disabled:opacity-50 disabled:cursor-not-allowed
//         flex items-center  border border-slate-300 px-3 py-2 rounded text-sm font-medium  transition-colors
//     `;

//   const variantStyles = {
//     primary: "bg-(--primary) text-white hover:bg-blue-700",
//     secondary: "bg-(--hover) text-(--text) hover:bg-(--border)",
//     success: "bg-green-600 text-white hover:bg-green-700",
//     danger: "bg-red-600 text-white hover:bg-red-700",
//     outline: "border border-(--border) text-(--text) hover:bg-(--hover)",
//     subtle: "bg-transparent text-(--text) hover:bg-(--hover)",
//   };

//   const sizeStyles = {
//     sm: "px-3 py-1.5 text-sm gap-1",
//     md: "px-4 py-2 text-base gap-1",
//     lg: "px-5 py-2 text-base gap-1",
//     xs: "px-2 py-2 text-base gap-1",
//     sl: "px-2 w-full py-2 text-base gap-1",
//   };

//   const iconSize =
//     size === "sm" ? 14 : size === "md" ? 16 : size === "sl" ? 16 : 16;

//   return (
//     <button
//       type={type}
//       onClick={action}
//       disabled={disabled || loading}
//       className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}  flex items-center justify-center`}
//     >
//       {loading ? (
//         <Loader2 size={iconSize} className="animate-spin mr-2" />
//       ) : (
//         Icon && <Icon size={iconSize} />
//       )}
//       <span className="">{loading ? "Please Wait..." : children}</span>
//     </button>
//   );
// }
/**
 * @typedef {'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'subtle'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg' | 'xs' | 'sl'} ButtonSize
 * @typedef {'button' | 'submit' | 'reset' } ButtonType
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {React.ComponentType} [props.Icon]
 * @param {ButtonVariant} [props.variant]
 * @param {ButtonSize} [props.size]
 * @param {() => void} [props.action]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.loading]
 * @param {ButtonType} [props.type]
 */
export default function ApexButton({
  children,
  Icon,
  variant = "primary",
  action,
  size = "sm",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const baseStyles = `
    flex items-center justify-center
    h-full 
    font-medium
    transition-all
    duration-200
    cursor-pointer
    whitespace-nowrap
    rounded-[2.5px]
    border
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary:
      "bg-[#0562b3] border-[#0562b3] text-white hover:bg-[#044d8c] hover:border-[#044d8c] shadow-sm",
    secondary:
      "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm",
    success:
      "bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700 shadow-sm",
    danger:
      "bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 shadow-sm",
    outline: "bg-transparent border-slate-300 text-slate-600 hover:bg-slate-50",
    subtle:
      "bg-transparent border-transparent text-slate-600 hover:bg-slate-100 shadow-none",
  };

  const sizeStyles = {
    xs: "px-2 py-1 text-xs gap-1.5",
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2",
    sl: "w-full px-4 py-2 text-sm gap-2",
  };

  const iconSize = size === "xs" || size === "sm" ? 14 : 16;

  return (
    <button
      type={type}
      onClick={action}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        Icon && <Icon size={iconSize} />
      )}
      <span>{loading ? "Please Wait..." : children}</span>
    </button>
  );
}
