import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, wrapperClass, ...props }, ref) => (
  <div className={cn("overflow-x-auto", wrapperClass)}>
    <table
      ref={ref}
      className={cn("w-full caption-top text-sm ", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(" bg-muted font-medium", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-default-300 transition-colors  data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-14 px-4  ltr:text-left rtl:text-right ltr:last:text-right rtl:last:text-left align-middle font-semibold  text-sm  text-default-800    capitalize  ltr:[&:has([role=checkbox])]:pr-0 rtl:[&:has([role=checkbox])]:pl-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle  text-sm text-default-600 last:text-right rtl:last:text-left font-normal  ltr:[&:has([role=checkbox])]:pr-0 rtl:[&:has([role=checkbox])]:pl-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mb-4 text-sm font-medium text-default-700 text-start",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
