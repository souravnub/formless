
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
import { LogoutButton } from "@/components/LogoutButton";
import { UserTable } from "@/components/userTable";

export default async function UserDashboard() {
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
                <MenubarTrigger>Forms</MenubarTrigger>
                <MenubarTrigger>Submissions</MenubarTrigger>
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
                Welcome {a?.user.name}! Here's what's on the menu for today.
              </h2>
              <Tabs defaultValue="overview" className="">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Forms</TabsTrigger>
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
                            <CardTitle>Form X Name</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              Form X has not been Submitted yet. Please submit
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button>Go To Form</Button>
                          </CardFooter>
                        </Card>

                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>Form Y Name</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Form Y has been submitted at (Timestamp)</p>
                          </CardContent>
                          <CardFooter>
                            <Button>View/Edit Submission</Button>
                          </CardFooter>
                        </Card>
                        {/* Form Issues*/}
                        <Card className="m-2 min-w-[300px]">
                          <CardHeader>
                            <CardTitle>Form Issue</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              There is an issue with Form Z. Please review your submission.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button>View Submission</Button>
                          </CardFooter>
                        </Card>
                      </div>
                      {/*Forms for Today*/}
                      <div className="flex flex-row">
                        <Card className="flex-grow">
                          <CardHeader>
                            <CardTitle>Forms Due Today</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <UserTable />
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
