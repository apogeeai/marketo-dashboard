"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Download, Menu } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const emailList = [
  "ES-2024-07-31-Link-Testing-iBanking",
  "ES-2024-07-31-Student-Loan-Disbursement-Sent",
  "ES-2024-08-12-Federal-Plus-vs-Student-Loan",
  "ES-2024-08-16-SEG-Closures",
  "ES-2024-08-23-Escrow-Reminder",
  "ES-2024-08-28-Loan-Refi-Fall",
  "ES-2024-09-04-Essential-Business-Checking",
  "ES-2024-09-04-Member-Appreciation-Week-1",
  "ES-2024-09-04-Member-Appreciation-Week-2",
  "ES-2024-09-04-Member-Appreciation-Week-3",
  "ES-2024-09-04-Premium-Business-Checking",
  "ES-2024-09-09-Christmas-Club",
  "ES-2024-09-16-HELOC-Draw",
  "ES-2024-09-16-HELOC-Draw-0",
  "ES-2024-09-18-Chatbot-Awareness",
  "ES-2024-09-18-Rate-Change-Notification",
  "ES-2024-10-02-Payroll-Calendar",
  "ES-2024-10-02-Payroll-Calendar-TY",
];

const openData = [
  { name: "0.5", value: 600 },
  { name: "1", value: 200 },
  { name: "2", value: 220 },
  { name: "3", value: 120 },
  { name: "4", value: 100 },
  { name: "5", value: 60 },
  { name: "8", value: 140 },
  { name: "12", value: 120 },
  { name: "24", value: 120 },
  { name: "48", value: 80 },
  { name: "after", value: 60 },
];

interface CircleChartProps {
   total: number;
  label: string;
  sublabel: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fullCircle?: boolean;
}

const CircleChart: React.FC<CircleChartProps> = ({
 
  total,
  label,
  sublabel,
  size = "md",
  color = "#10B981",
  fullCircle = false,
}: CircleChartProps) => {
  const percentage = (total / total) * 100;
  const strokeDasharray = `${percentage}, 100`;
  const sizes = {
    sm: "w-20 h-20 md:w-24 md:h-24",
    md: "w-24 h-24 md:w-32 md:h-32",
    lg: "w-32 h-32 md:w-48 md:h-48",
  };

  return (
    <div className={`flex flex-col items-center ${sizes[size]}`}>
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={fullCircle ? "0" : "25"}
            transform={fullCircle ? "" : "rotate(-90 18 18)"}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div
            className={
              size === "lg"
                ? "text-2xl md:text-4xl font-bold"
                : "text-xl md:text-2xl font-bold"
            }
          >
            
          </div>
          <div className="text-xs text-gray-500">{sublabel}</div>
        </div>
      </div>
      <div className="mt-2 text-xs md:text-sm font-medium text-center">
        {label}
      </div>
    </div>
  );
};

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleExport = () => {
    const csvContent = `Email,Delivered,Opens,Clicks,Unsubscribes
ES-2024-07-31-Student-Loan-Disbursement-Sent,2538,1926,30,2`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "email_performance_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const Sidebar = () => (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 flex justify-center">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-dtYsDUrL2aRsUAPwa7sFhfn4pppuuZ.png" 
          alt="Logo" 
          width={250}
          height={100}
          style={{ width: '250px', height: 'auto' }}
        />
      </div>
      <ScrollArea className="flex-grow px-4">
        <h2 className="text-lg font-semibold mb-2">Email Campaigns</h2>
        <ul className="space-y-2">
          {emailList.map((email, index) => (
            <li
              key={index}
              className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer"
            >
              {email}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-200"> {/* Changed bg-gray-100 to bg-gray-200 */}
      <div className="mx-auto w-full max-w-[1275px] flex">
        {!isMobile && (
          <div
            className={`bg-white ${sidebarOpen ? "w-[300px]" : "w-0"} transition-all duration-300 ease-in-out overflow-hidden`}
          >
            <Sidebar />
            <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-dtYsDUrL2aRsUAPwa7sFhfn4pppuuZ.png" 
          alt="Logo" 
          style={{ width: '250px', height: 'auto' }}
        />
          </div>
        )}

        {/* Main Content */}
        <ScrollArea className="flex-1 bg-gray-200"> {/* Added bg-gray-200 here */}
          <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                </h1>
                <h2 className="text-sm md:text-xl text-gray-600">
                  ES-2024-07-31-Student-Loan-Disbursement-Sent
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExport}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">Export</span>
                </Button>
                {isMobile && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <Sidebar />
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>

            {!isMobile && (
              <Button
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-40"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* Email Send */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 pb-[40px]">
              <h2 className="text-lg font-semibold mb-4">Email Send</h2>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <CircleChart
                  value={2538}
                  total={2545}
                  label=""
                  sublabel="Delivered"
                  size="lg"
                  fullCircle={true}
                />
                <div className="w-full md:w-2/3 h-64 mt-4 md:mt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={openData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2 mb-[40px] !important text-xs md:text-sm text-gray-500">
                    Hours since sent
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 pb-[40px]">
                <div className="flex justify-center">
                  <CircleChart
                    value={41}
                    total={100}
                    label="Engagement"
                    sublabel=""
                  />
                </div>
                <div className="flex justify-center">
                  <CircleChart
                    value={1926}
                    total={2538}
                    label="Opens"
                    sublabel=""
                  />
                </div>
                <div className="flex justify-center pt-[40px] sm:pt-0">
                  <CircleChart
                    value={1.6}
                    total={100}
                    label="Click to Open"
                    sublabel=""
                  />
                </div>
                <div className="flex justify-center pt-[40px] sm:pt-0">
                  <CircleChart
                    value={30}
                    total={1926}
                    label="Clicks"
                    sublabel=""
                  />
                </div>
                <div className="flex justify-center col-span-2 sm:col-span-3 lg:col-span-1 pt-[40px] sm:pt-0">
                  <CircleChart
                    value={2}
                    total={2538}
                    label="Unsubscribes"
                    sublabel=""
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
