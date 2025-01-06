import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const kbdVariants = cva(
  " px-3 h-8 inline-flex border leading-none [&>abbr]:leading-none  border-default-300 space-x-0.5 items-center  font-medium text-center    bg-default-100 leading-none   text-default-600 rounded-xl",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        sm: " h-7 text-xs [&>abbr]:text-sm rounded-lg",
        md: " text-sm [&>abbr]:text-lg",
        lg: " px-4 h-9  [&>abbr]:text-xl text-base",
        xl: " px-4 h-10  [&>abbr]:text-2xl text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Kbd = React.forwardRef(
  (
    {
      className,
      keys,
      children,
      variant,
      size,

      ...props
    },
    ref
  ) => {
    const kbdKeysMap = {
      command: "⌘",
      shift: "⇧",
      ctrl: "⌃",
      option: "⌥",
      enter: "↵",
      delete: "⌫",
      escape: "⎋",
      tab: "⇥",
      capslock: "⇪",
      up: "↑",
      right: "→",
      down: "↓",
      left: "←",
      pageup: "⇞",
      pagedown: "⇟",
      home: "↖",
      end: "↘",
      help: "?",
      space: "␣",
    };
    const getKeys = keys.map((key) => {
      const keyLabel = kbdKeysMap[key];
      return (
        <abbr key={key} title={`key-${key}`} className=" no-underline  ">
          {keyLabel}
        </abbr>
      );
    });
    return (
      <kbd ref={ref} className={cn(kbdVariants({ variant, size }), className)}>
        {getKeys}
        <span className=" leading-none">{children}</span>
      </kbd>
    );
  }
);
Kbd.displayName = "Kbd";
export { Kbd };
