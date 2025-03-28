
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState("Muito fraca");

  useEffect(() => {
    const calculateStrength = () => {
      if (!password) {
        setStrength(0);
        setLabel("Muito fraca");
        return;
      }

      let score = 0;
      
      // Length check
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;
      
      // Character variety checks
      if (/[A-Z]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
      
      // Set strength level (0-4)
      let strengthLevel = Math.min(4, Math.floor(score / 2));
      setStrength(strengthLevel);
      
      // Set label based on strength
      const labels = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"];
      setLabel(labels[strengthLevel]);
    };

    calculateStrength();
  }, [password]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              {
                "w-1/4 bg-destructive": strength === 1,
                "w-2/4 bg-orange-400": strength === 2,
                "w-3/4 bg-yellow-400": strength === 3,
                "w-full bg-green-500": strength === 4,
                "w-0": strength === 0,
              }
            )}
          />
        </div>
        <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 w-24 text-right">
          {label}
        </span>
      </div>
    </div>
  );
}
