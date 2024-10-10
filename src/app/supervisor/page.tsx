import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserTable } from "@/components/userTable";
import {
  ArrowUpRight,
  FilePlus2,
  FileWarning,
  Layers,
  ListFilter,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";

export default async function UserDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-5">Supervisor Overview</h1>
      <div className="flex gap-5">
        <Link href={"/submissions/new"} className="flex-1">
          <Card className="relative hover:bg-accent rounded-xl">
            <CardHeader className="pb-4">
              <div className="bg-primary p-2 rounded-md w-fit">
                <FilePlus2 className="text-secondary size-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>New Submission</CardTitle>
            </CardContent>
            <Plus className="absolute right-3 top-3 text-muted-foreground" />
          </Card>
        </Link>
        <Link href={"/submissions"} className="flex-1">
          <Card className="relative hover:bg-accent rounded-xl">
            <CardHeader className="pb-4">
              <div className="bg-primary p-2 rounded-md w-fit">
                <Layers className="text-secondary size-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>View Submission</CardTitle>
            </CardContent>
            <ArrowUpRight className="absolute right-3 top-3 text-muted-foreground" />
          </Card>
        </Link>

        <Link href={"/submissions?type=issues"} className="flex-1">
          <Card className="relative hover:bg-accent rounded-xl">
            <CardHeader className="pb-4">
              <div className="bg-primary p-2 rounded-md w-fit">
                <FileWarning className="text-secondary size-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>Reported Submissions</CardTitle>
            </CardContent>
            <ArrowUpRight className="absolute right-3 top-3 text-muted-foreground" />
          </Card>
        </Link>
      </div>
      {/*Forms for Today*/}
      <div className="mt-8">
        <h1 className="font-semibold text-lg mb-2">Forms due today</h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">View All</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button variant={"outline"}>
              <ListFilter className="text-muted-foreground size-4 mr-1" />{" "}
              Filters
            </Button>
          </div>

          <UserTable />
        </div>
      </div>
    </div>
  );
}
