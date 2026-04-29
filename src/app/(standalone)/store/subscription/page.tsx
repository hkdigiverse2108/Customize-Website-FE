"use client";

import { Queries, Mutations } from "@/api";
import { PlanBase } from "@/type";
import { Button, Row, Spin, Tag, Typography } from "antd";
import { CommonCard } from "@/components/common";
import { RiCheckLine, RiLogoutBoxRLine } from "react-icons/ri";
import { setSignin, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import Link from "next/link";

const { Title, Text } = Typography;

const VendorPlansPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: planData, isLoading } = Queries.useGetPlan({ activeFilter: true });
  const { mutate: selectPlan, isPending } = Mutations.useUpdateUserSubscription();

  const handleSelectPlan = (planId: string) => {
    selectPlan({ planId }, { onSuccess: (res) => {dispatch(setSignin(res.data));router.push(ROUTES.STORE.DASHBOARD);}});
  };


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Spin size="large" description="Loading Plans..." />
      </div>
    );
  }
  const plans = planData?.data?.plans || [];
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <Button type="text" onClick={() => router.push(ROUTES.STORE.DASHBOARD)} className="text-gray-500 hover:text-brand-600 font-medium">Skip for now</Button>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white font-bold text-2xl shadow-lg mb-6">CW</div>
          <Title level={1} className="mb-3 tracking-tight">Select Your Subscription</Title>
          <Text className="text-gray-500 text-lg max-w-2xl mx-auto block">Unlock the full potential of your store. Choose a plan that fits your business scale and start selling today.</Text>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {plans.map((plan: PlanBase) => (
            <CommonCard key={plan._id} col={{ xs: 24, md: 12, lg: 8 }} cardProps={{ className: "h-full border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden group", styles: { body: { padding: 0 } } }}>
              <div className="p-8 flex flex-col h-full bg-white">
                <div className="mb-8">
                  <Tag className="bg-brand-50 text-brand-700 border-none px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-[10px] mb-4">{plan.duration}</Tag>
                  <Title level={2} className="mb-2 group-hover:text-brand-600 transition-colors text-gray-900 capitalize text-2xl">{plan.name}</Title>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600 font-medium uppercase text-xs tracking-widest">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Plan Features</div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                        <RiCheckLine className="text-brand-600 font-bold" />
                      </div>
                      <span className="font-medium">{plan.productLimit} Products</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                        <RiCheckLine className="text-brand-600 font-bold" />
                      </div>
                      <span className="font-medium">{plan.themeLimit} Themes</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                        <RiCheckLine className="text-brand-600 font-bold" />
                      </div>
                      <span className="font-medium">{plan.orderLimit} Orders / Month</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                        <RiCheckLine className="text-brand-600 font-bold" />
                      </div>
                      <span className="font-medium">{plan.blogLimit} Blog Posts</span>
                    </li>
                  </ul>
                </div>

                <Button type="primary" size="large" block className="rounded-2xl h-14 font-bold bg-brand-600 hover:bg-brand-700 border-none shadow-lg shadow-brand-200" onClick={() => handleSelectPlan(plan._id as string)} loading={isPending}>Select {plan.name}</Button>
              </div>
            </CommonCard>
          ))}
        </Row>

        <div className="mt-16 text-center">
          <Text className="text-gray-600">Need a custom solution? <Link href="/" className="text-brand-600 font-semibold hover:underline">Contact our sales team</Link></Text>
        </div>
      </div>
    </main>
  );
};

export default VendorPlansPage;
