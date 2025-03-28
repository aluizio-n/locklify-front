
import { Button, ButtonProps } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PricingButtonProps extends ButtonProps {
  plan?: "basic" | "premium";
}

export function PricingButton({ 
  plan = "premium", 
  children, 
  ...props 
}: PricingButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
