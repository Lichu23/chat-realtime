import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

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
import { Separator } from "@/components/ui/separator";
import { User } from "stream-chat";
import { Badge } from "../ui/badge";

interface UserSelectorProps {
  users: User[]; 
  selectedUsers: string[]; 
  addUser: (id: string) => void;
  removeUser: (id: string) => void;
}

export default function UserSelector({
  users,
  selectedUsers,
  addUser,
  removeUser,
}: UserSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        <Button variant="outline" className="text-muted-foreground">
          Select users
        </Button>
        {selectedUsers?.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedUsers.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedUsers.length > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedUsers.length} selected
                </Badge>
              ) : (
                users
                  .filter((user) => selectedUsers.includes(user.id))
                  .map((user) => (
                    <Badge
                      variant="secondary"
                      key={user.id}
                      className="rounded-sm px-1 font-normal"
                    >
                      {user.name || user.id}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Select providers" />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {users.map((user) => {
                const isSelected = selectedUsers.includes(user.id);
                return (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      if (isSelected) {
                        removeUser(user.id);
                      } else {
                        addUser(user.id);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded",
                          isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {user.name || user.id}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
