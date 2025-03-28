
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Copy, Trash, Edit, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PasswordEntry, usePasswords } from "@/contexts/passwords-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PasswordCardProps {
  password: PasswordEntry;
}

export default function PasswordCard({ password }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { deletePassword } = usePasswords();

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password.password);
    toast.success("Senha copiada para a área de transferência");
  };

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(password.username);
    toast.success("Usuário copiado para a área de transferência");
  };

  const handleEdit = () => {
    navigate(`/edit-password/${password.id}`);
  };

  const handleDelete = async () => {
    const success = await deletePassword(password.id);
    if (success) {
      toast.success("Senha excluída com sucesso");
    }
  };

  const handleOpenUrl = () => {
    if (password.url) {
      let url = password.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Get domain from URL for favicon
  const getServiceIcon = () => {
    if (password.url) {
      try {
        const url = new URL(password.url.startsWith('http') ? password.url : `https://${password.url}`);
        return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
      } catch {
        return null;
      }
    }
    return null;
  };

  const serviceIcon = getServiceIcon();
  const serviceName = password.serviceName;
  const serviceInitial = serviceName.charAt(0).toUpperCase();

  return (
    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
              {serviceIcon ? (
                <img src={serviceIcon} alt={serviceName} className="h-full w-full object-contain" />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {serviceInitial}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-bold text-lg truncate">{password.serviceName}</h3>
              <div className="flex items-center mt-1">
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {password.username}
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-1"
                      onClick={handleCopyUsername}
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copiar usuário</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copiar usuário</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          {password.url && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={handleOpenUrl}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Abrir site</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Abrir site</TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="mt-3 p-2 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-between">
          <div className="overflow-hidden mr-2">
            {showPassword ? (
              <span className="font-mono text-sm truncate">{password.password}</span>
            ) : (
              <span className="text-sm">••••••••••••••</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Esconder senha" : "Mostrar senha"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showPassword ? "Esconder senha" : "Mostrar senha"}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={handleCopyPassword}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copiar senha</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copiar senha</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Editar senha</TooltipContent>
        </Tooltip>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-destructive border-destructive/50 hover:bg-destructive/10"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Excluir</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta senha? Esta ação não poderá ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
