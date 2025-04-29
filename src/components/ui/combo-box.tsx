// TODO: this is work in progress

"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboBoxProps<T> = {
  data: T[];
  value: string;
  onChange: (value: string) => void;
  displayKey: keyof T;
  placeholder?: string;
  searchPlaceholder?: string;
};

export function ComboBox<
  T extends { id: string } & Record<string, string | number>,
>({
  data,
  value,
  onChange,
  displayKey,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? data?.find((item) => String(item[displayKey]) === value)?.[
                displayKey
              ]
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  value={String(item[displayKey])}
                  key={item.id}
                  onSelect={() => {
                    onChange(String(item[displayKey]));
                    setOpen(false);
                  }}
                >
                  {String(item[displayKey])}
                  <Check
                    className={cn(
                      "ml-auto",
                      String(item[displayKey]) === value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
