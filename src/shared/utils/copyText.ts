import { toast } from "sonner";

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Команда скопирована!");
  } catch (err) {
    toast.error("Не удалось скопировать");
  }
};
