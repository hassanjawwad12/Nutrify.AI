import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Autocomplete = React.forwardRef(
  ({ label, className, children, labelClass, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [selectedLabel, setSelectedLabel] = React.useState("Select item...");

    const handleSelect = (newValue, newLabel) => {
      setValue(newValue);
      setSelectedLabel(newLabel);
      setOpen(false);
    };

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(" w-full justify-between", labelClass)}
          >
            {selectedLabel}
            <ChevronsUpDown className="me-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px]" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                  onSelect: handleSelect,
                  isSelected: child.props.value === value,
                })
              )}
            </CommandGroup>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
Autocomplete.displayName = "Autocomplete";

const AutocompleteItem = React.forwardRef(
  ({ children, value, onSelect, isSelected, ...props }, ref) => {
    const handleItemClick = () => {
      onSelect(value, children);
    };

    return (
      <CommandItem onSelect={handleItemClick} ref={ref} {...props}>
        {children}
        <Check
          className={cn(
            "mr-2 h-4 w-4 me-auto",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        />

      </CommandItem>
    );
  }
);
AutocompleteItem.displayName = "AutocompleteItem";
export { Autocomplete, AutocompleteItem };
