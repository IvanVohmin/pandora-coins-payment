"use client";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { FC, useState } from "react";

const serverIp = "play.pandoramc.ru";

const IPButton: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(serverIp);
    if (copied) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full font-mono h-16 flex items-center justify-center">
      <Button onClick={handleCopy} variant={"outline"} size={"lg"}>
        {serverIp}
        {copied ? (<Check className="text-green-600" />) : (<Copy className="text-zinc-500" />)}
      </Button>
    </section>
  );
};

export default IPButton;
