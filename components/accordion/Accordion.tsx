"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/utils/utils";

interface AccordionSubTitleContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
    progressBar: string 
}

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-[#343434] px-[28px] data-[state=open]:bg-[#141414]", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between text-sm font-medium text-[20px] transition-all hover:text-[#f58420] data-[state=open]:text-[#f58420] text-left [&[data-state=open]>svg]:rotate-180 py-[30px]",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-[20px] w-[20px] shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("mb-[30px] pt-0 text-[#888888] text-[16px] leading-[24px]", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const AccordionSubTitleContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionSubTitleContentProps
>(({ className, children, progressBar, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 text-[#E0DFE3] pb-[20px] text-[16px] flex justify-between items-center", className)}>{children}
        <div className="relative bg-[#212121] w-[100px] rounded-[10px] h-[10px]">
          <div
            style={{
              backgroundColor: '#212121',
              width: `100px`,
            }}
            className="absolute h-[10px]  rounded-[10px]"
          />
          <div
            style={{
              backgroundColor: '#F58420',
              width: progressBar,
            }}
            className="absolute h-[10px]  rounded-[10px]"
          />
        </div>
    </div>
  </AccordionPrimitive.Content>
))
AccordionSubTitleContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionSubTitleContent }
