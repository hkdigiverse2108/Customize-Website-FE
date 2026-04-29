"use client";

import { ROUTES } from "@/constants";
import { useAppSelector } from "@/store";
import { Alert, Button, Card, Row, Statistic, Typography } from "antd";
import { CommonCard } from "@/components/common";
import Link from "next/link";
import { RiShoppingBagLine, RiMoneyDollarCircleLine, RiUserLine, RiStarLine } from "react-icons/ri";

const { Title, Text } = Typography;

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const hasPlan = !!user?.subscription?.planId;

  return (
    <div className="space-y-6">
      {!hasPlan && (
        <Alert title={<Text strong className="text-brand-800 text-base block">Choose a Subscription Plan</Text>} description={
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
            <Text className="text-brand-700">You haven't selected a plan yet. Subscribe now to activate your store and start selling.</Text>
            <Link href={ROUTES.STORE.PLANS}>
              <Button type="primary" className="bg-brand-600 hover:bg-brand-700 border-none px-6 rounded-lg font-semibold h-10 shadow-sm">
                View Plans
              </Button>
            </Link>
          </div>
        } type="info" showIcon className="bg-brand-50 border-brand-200 rounded-xl shadow-sm" />
      )}

      <div className="flex items-center justify-between">
        <div>
          <Title level={3} className="mb-0">Welcome back, {user?.firstName || "Vendor"}!</Title>
          <Text type="secondary">Here's what's happening with your store today.</Text>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <CommonCard col={{ xs: 24, sm: 12, lg: 6 }} cardProps={{ className: "rounded-xl border-none shadow-sm hover:shadow-md transition-shadow" }}>
          <Statistic title={<span className="flex items-center gap-2 text-gray-500 font-medium"><RiMoneyDollarCircleLine className="text-xl text-blue-500" /> Total Revenue</span>} value={0} prefix="₹" styles={{ content: { fontWeight: 700 } }} />
        </CommonCard>
        <CommonCard col={{ xs: 24, sm: 12, lg: 6 }} cardProps={{ className: "rounded-xl border-none shadow-sm hover:shadow-md transition-shadow" }}>
          <Statistic title={<span className="flex items-center gap-2 text-gray-500 font-medium"><RiShoppingBagLine className="text-xl text-green-500" /> Total Orders</span>} value={0} styles={{ content: { fontWeight: 700 } }} />
        </CommonCard>
        <CommonCard col={{ xs: 24, sm: 12, lg: 6 }} cardProps={{ className: "rounded-xl border-none shadow-sm hover:shadow-md transition-shadow" }}>
          <Statistic title={<span className="flex items-center gap-2 text-gray-500 font-medium"><RiUserLine className="text-xl text-purple-500" /> Total Customers</span>} value={0} styles={{ content: { fontWeight: 700 } }} />
        </CommonCard>
        <CommonCard col={{ xs: 24, sm: 12, lg: 6 }} cardProps={{ className: "rounded-xl border-none shadow-sm hover:shadow-md transition-shadow" }}>
          <Statistic title={<span className="flex items-center gap-2 text-gray-500 font-medium"><RiStarLine className="text-xl text-yellow-500" /> Average Rating</span>} value={0} precision={1} styles={{ content: { fontWeight: 700 } }} />
        </CommonCard>
      </Row>

      <CommonCard cardProps={{ className: "rounded-xl border-none shadow-sm h-64 flex items-center justify-center bg-gray-50/50" }}>
        <div className="text-center">
          <RiShoppingBagLine className="mx-auto text-5xl text-gray-300 mb-4" />
          <Title level={4} className="text-gray-400 mb-0 font-medium">No sales data yet</Title>
          <Text className="text-gray-400">Once you start selling, your performance charts will appear here.</Text>
        </div>
      </CommonCard>
    </div>
  );
};

export default Dashboard;
