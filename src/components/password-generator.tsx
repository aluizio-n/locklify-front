
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { PasswordStrength } from "./password-strength";

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void;
}

export function PasswordGenerator({
  onPasswordGenerated,
}: PasswordGeneratorProps) {
  const [length, setLength] = useState<number>(16);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
    onPasswordGenerated(password);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useNumbers, useSymbols]);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Senha gerada</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={generatePassword}
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Gerar nova senha</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-muted rounded w-full font-mono text-sm overflow-x-auto">
            {generatedPassword}
          </div>
        </div>
        <PasswordStrength password={generatedPassword} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="length" className="text-sm font-medium">
              Comprimento: {length}
            </label>
          </div>
          <Slider
            id="length"
            min={8}
            max={32}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="uppercase"
              className="text-sm font-medium cursor-pointer"
            >
              Letras maiúsculas (A-Z)
            </label>
            <Switch
              id="uppercase"
              checked={useUppercase}
              onCheckedChange={setUseUppercase}
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="numbers"
              className="text-sm font-medium cursor-pointer"
            >
              Números (0-9)
            </label>
            <Switch
              id="numbers"
              checked={useNumbers}
              onCheckedChange={setUseNumbers}
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="symbols"
              className="text-sm font-medium cursor-pointer"
            >
              Símbolos (!@#$%...)
            </label>
            <Switch
              id="symbols"
              checked={useSymbols}
              onCheckedChange={setUseSymbols}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
