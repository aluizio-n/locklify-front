
import { Button, ButtonProps } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PricingButtonProps extends ButtonProps {
  plan?: "basic" | "premium" | "lifetime";
  price?: string;
}

export function PricingButton({ 
  plan = "premium", 
  price = "45",
  children, 
  ...props 
}: PricingButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/checkout?plan=${plan}&price=${price}`);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
