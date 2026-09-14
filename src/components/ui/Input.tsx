// src/components/ui/Input.tsx
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="body-secondary w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 
                 text-white placeholder-zinc-500 outline-none transition-all
                 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
    />
  );
};
