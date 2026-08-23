import * as React from "react";

import { cn } from "@/lib/utils";

interface PaginationProps
  extends React.ComponentProps<"nav"> {
  className?: string;
}

function Pagination({
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        "mx-auto flex w-full justify-center",
        className
      )}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "flex flex-row items-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "",
        className
      )}
      {...props}
    />
  );
}

interface PaginationLinkProps
  extends React.ComponentProps<"a"> {
  isActive?: boolean;
}

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={
        isActive ? "page" : undefined
      }
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary",
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      aria-label="Go to previous page"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      Previous
    </a>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      aria-label="Go to next page"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      Next
    </a>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
};