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

type Breadcrumb = { href: string; name: string };
type CustomBreadcrumbProps = { list: Breadcrumb[]; className?: string };

const CustomBreadcrumb = ({ list, className }: CustomBreadcrumbProps) => {
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList className="capitalize">
                {list.map((crumb, idx) => (
                    <>
                        {idx === list.length - 1 ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={crumb.href}>
                                        {crumb.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <SlashIcon />
                                </BreadcrumbSeparator>
                            </>
                        )}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
