
import React, { FormEvent, useState } from "react";
// will need for later
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
// will need for data
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { DashChart } from "@/components/dashchart";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const a = await auth();
  return (
    <main className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <header className="shadow p-4 flex justify-between items-center">
            <div className="text-lg font-semibold">Dashboard</div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Overview</MenubarTrigger>
                <MenubarTrigger>Users</MenubarTrigger>
                <MenubarTrigger>Forms</MenubarTrigger>
                <MenubarTrigger>Submissions</MenubarTrigger>
                <MenubarTrigger>Reports</MenubarTrigger>
              </MenubarMenu>
            </Menubar>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{a?.user.name}</span>
              <LogoutButton/>
            </div>
          </header>

          {/* Main content container */}
          <div className="flex-1 p-6 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Welcome {a?.user.name} what would you like to do today?
              </h2>
              <Tabs defaultValue="overview" className="">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="forms">Forms</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {/* Overview Cards */}
                      <div className="flex flex-row">
                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>Submissions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              Currently X/Y users have not submitted forms today
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button>View Submissions</Button>
                          </CardFooter>
                        </Card>

                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>Form Usage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>The most used form this month is X</p>
                          </CardContent>
                          <CardFooter>
                            <Button>View Form</Button>
                          </CardFooter>
                        </Card>
                        {/* Form Issues*/}
                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>Form Issues</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              The form with the most revisions and resubmissions
                              is X
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button>View Form</Button>
                          </CardFooter>
                        </Card>
                        {/* User Account Requests*/}
                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>User Request </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>There are X requests to create an account</p>
                          </CardContent>
                          <CardFooter>
                            <Button>View Requests</Button>
                          </CardFooter>
                        </Card>
                      </div>
                      {/* Form Metrics Chart*/}
                      <div className="flex flex-row">
                        <Card className="flex-grow">
                          <CardHeader>
                            <CardTitle>Form Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <DashChart />
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Card>
                        <CardHeader>
                          <CardTitle>Supervisor Accounts</CardTitle>
                        </CardHeader>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Employee Accounts</CardTitle>
                        </CardHeader>
                      </Card>
                      </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
