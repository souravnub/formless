import React from "react";

import { SlashIcon } from "@radix-ui/react-icons";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type Breadcrumb = { href: string; name: string };
type CustomBreadcrumbProps = { list: Breadcrumb[]; className?: string };

const CustomBreadcrumb = ({ list, className }: CustomBreadcrumbProps) => {
    return (
        <Breadcrumb className={cn(className, "my-3")}>
            <BreadcrumbList className="capitalize">
                {list.map((crumb, idx) => (
                    <BreadcrumbItem key={crumb.name}>
                        {idx === list.length - 1 ? (
                            <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                        ) : (
                            <>
                                <BreadcrumbLink href={crumb.href}>
                                    {crumb.name}
                                </BreadcrumbLink>
                                <SlashIcon />
                            </>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
