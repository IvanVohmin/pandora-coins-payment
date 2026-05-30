"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const supportEmail = "pandora.anarchiya@gmail.com";

const Footer = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    toast.success("Почта скопирована в буфер обмена!");
  };

  return (
    <footer className="relative mt-auto border-t bg-background/50 backdrop-blur-md">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container pt-12 pb-6">
        <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-12 text-sm text-muted-foreground/80">
          
          {/* Левая часть: Копирайт */}
          <div className="flex flex-col gap-2 text-center lg:text-left self-center lg:self-start mt-4 lg:mt-0">
            <span className="font-medium tracking-wide text-foreground/90 text-base">
              &copy; {new Date().getFullYear()} PandoraMC.
            </span>
            <span className="text-xs text-muted-foreground/60 max-w-[250px] mx-auto lg:mx-0">
              Все права защищены. Проект не связан с Mojang AB.
            </span>
          </div>

          {/* Правая часть: Навигационные колонки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 w-full lg:w-auto text-center sm:text-left">
            
            {/* Колонка 1: Игрокам */}
            <nav className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground text-base mb-1">Игрокам</h3>
              <Link
                href="https://telegra.ph/Aktualnye-pravila-proekta-PandoraMC-05-30"
                className="hover:text-foreground transition-colors"
              >
                Правила
              </Link>
              <Link
                href="https://telegra.ph/Kak-sdelat-kastomnyj-titul-05-30"
                className="hover:text-foreground transition-colors"
              >
                Кастомные титулы
              </Link>
              <Link
                href="https://telegra.ph/Kak-stat-blogerom-na-servere-05-30"
                className="hover:text-foreground transition-colors"
              >
                Стать блогером
              </Link>
            </nav>

            {/* Колонка 2: Связь */}
            <nav className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground text-base mb-1">Связь</h3>
              
              {/* Наши соц. сети (Модальное окно) */}
              <Dialog>
                <DialogTrigger className="hover:text-foreground transition-colors cursor-pointer sm:text-left">
                  Наши соц. сети
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Наши социальные сети</DialogTitle>
                    <p className="text-muted-foreground text-sm mb-0 p-0">
                      Присоединяйтесь к нам в социальных сетях, чтобы найти друзей по игре, хорошо провести время и следить за последними новостями проекта!
                    </p>
                  </DialogHeader>
                  <div className="flex flex-col gap-3 mt-4">
                    <Link
                      href="https://vk.com/pandoraanarchy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full p-3 rounded-md transition-opacity hover:opacity-90 font-medium text-white bg-[#0077FF]"
                    >
                      ВКонтакте
                    </Link>
                    <Link
                      href="https://t.me/pandoramc_ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full p-3 rounded-md transition-opacity hover:opacity-90 font-medium text-white bg-[#229ED9]"
                    >
                      Telegram
                    </Link>
                    <Link
                      href="https://discord.com/invite/BxYmkzmnK9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full p-3 rounded-md transition-opacity hover:opacity-90 font-medium text-white bg-[#5865F2]"
                    >
                      Discord
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Поддержка (Модальное окно) */}
              <Dialog>
                <DialogTrigger className="hover:text-foreground transition-colors cursor-pointer sm:text-left">
                  Поддержка
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Служба поддержки</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      Если у вас возникли вопросы или проблемы, вы можете
                      связаться с нами по электронной почте. Нажмите на адрес
                      ниже, чтобы скопировать его.
                    </p>
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center justify-between w-full p-4 border rounded-lg hover:bg-secondary transition-colors text-foreground font-medium group"
                    >
                      <span>{supportEmail}</span>
                      <Copy className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </nav>

            {/* Колонка 3: Документы */}
            <nav className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground text-base mb-1">Документы</h3>
              <a
                href="https://telegra.ph/Politika-konfidencialnosti-04-01-26"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="https://telegra.ph/Polzovatelskoe-soglashenie-04-01-19"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Пользовательское соглашение
              </a>
            </nav>

          </div>
        </div>

        {/* Нижняя часть: Огромный, адаптивный и четко видимый текст */}
        <div className="mt-12 overflow-hidden select-none pointer-events-none border-t border-border/20 pt-4">
          <h4 className="text-[12vw] sm:text-[14vw] md:text-[15vw] xl:text-[13rem] font-bold uppercase tracking-tighter leading-none text-center sm:text-left opacity-50 text-muted-foreground">
            Pandora
          </h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;