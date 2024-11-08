"use client";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { DashChart } from "@/components/dashchart";
import DashSubmissionsStat from "@/components/DashSubmissionsStat";
import { Button } from "@/components/ui/button";
import DashUsageStats from "@/components/DashUsageStats";
import DashFormIssues from "@/components/DashFormIssues";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { TTSButton, useTTS } from "@/components/TTSContext";

export default function AdminDashboard() {
  const { TTS, toggleTTS, textToSpeech } = useTTS();

  return (
    <div className=" p-2">
      <div className="container mx-auto space-y-2">
        <CustomBreadcrumb
          list={[
            { name: "dashboard", href: "/admin" },
            { name: "overview", href: "/admin" },
          ]}
        />
        <TTSButton />
        <div
          className="flex gap-2 flex-row flex-wrap"
          onClick={(e) => {
            const text = (e.target as HTMLElement).textContent || "";
            textToSpeech(text);
          }}
        >
          <Card className="flex-1 min-w-64 bg-accent/30">
            <CardHeader>
              <CardTitle>Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <DashSubmissionsStat />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/admin/submissions">View Submissions</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1 min-w-64 bg-accent/30">
            <CardHeader>
              <CardTitle>Form Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <DashUsageStats />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/admin/forms">View Form</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* Form Issues*/}
          <Card className="flex-1 min-w-64 bg-accent/30">
            <CardHeader>
              <CardTitle>Form Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <DashFormIssues />
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/admin/forms">View Form</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* User Account Requests*/}
          <Card className="flex-1 min-w-64 bg-accent/30">
            <CardHeader>
              <CardTitle>User Request </CardTitle>
            </CardHeader>
            <CardContent>
              <p>There are X requests to create an account</p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/admin/requests">View Requests</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* Form Metrics Chart*/}
        <Card className="bg-accent/30">
          <CardHeader>
            <CardTitle>Form Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <DashChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
