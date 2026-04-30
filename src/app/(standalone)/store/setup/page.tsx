"use client";

import { Queries, Mutations } from "@/api";
import { CommonFormImageBox, CommonValidationSelect, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { ROUTES } from "@/constants";
import { KYC_DOCUMENT_TYPE_OPTIONS } from "@/data";
import { StoreFormValues } from "@/type";
import { RemoveEmptyFields,StoreSchema } from "@/utils";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { Typography, Steps, Spin, Button, App } from "antd";
import { useState, useEffect } from "react";
import { RiStore2Line, RiMapPinLine, RiShieldCheckLine, RiArrowRightSLine, RiRocketLine, RiArrowLeftSLine } from "react-icons/ri";

const { Title, Text } = Typography;

const StoreSetupPage = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { mutate: addStore, isPending } = Mutations.useAddStore();
  const { data: storeData, isLoading: isStoreLoading } = Queries.useGetStore({});

  useEffect(() => {
    const stores = storeData?.data?.stores || [];
    if (!isStoreLoading && stores.length > 0) {
      router.push(ROUTES.STORE.DASHBOARD);
    }
  }, [isStoreLoading, storeData, router]);

  const steps = [
    { title: "Store Basics", icon: <RiStore2Line className="text-xl" /> },
    { title: "Business & KYC", icon: <RiShieldCheckLine className="text-xl" /> },
    { title: "Final Details", icon: <RiMapPinLine className="text-xl" /> },
  ];

  const initialValues: StoreFormValues = {
    name: "",
    slug: "",
    description: "",
    email: "",
    phone: "",
    subdomain: "",
    businessName: "",
    businessType: "",
    gstNumber: "",
    panNumber: "",
    kycStatus: "pending",
    kycDocuments: { type: "", documentUrl: "", verified: false },
    address: { country: "India", state: "", city: "", pincode: "", addressLine1: "", addressLine2: "", landmark: "" },
    socialLinks: { facebook: "", instagram: "", twitter: "", youtube: "", linkedin: "" },
    logo: [],
    banner: [],
    isActive: true,
    isPublished: true,
  };

  const handleSubmit = (values: StoreFormValues) => {
    const payload = RemoveEmptyFields(values);
    addStore(payload as StoreFormValues, {onSuccess: () => {message.success("Congratulations! Your store is ready.");router.push(ROUTES.STORE.DASHBOARD);},});
  };

  if (isStoreLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Spin size="large" description="Checking setup status..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcfd] py-16 px-4 sm:px-6 lg:px-8 no-scrollbar overflow-y-auto pb-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-3xl shadow-xl shadow-brand-200/50 mb-8 transform hover:rotate-3 transition-transform duration-300">CW</div>
          <Title level={1} className="mb-4 tracking-tight !text-slate-900 !font-extrabold !text-4xl md:!text-5xl">Let's build your <span className="text-brand-600">storefront</span></Title>
          <Text className="text-slate-500 text-xl font-medium">Tell us a bit about your business to get started.</Text>
        </div>
        <div className="mb-12">
          <CommonCard cardProps={{ className: "rounded-[32px] border-slate-200/50 shadow-xl shadow-slate-200/20 bg-white/50 backdrop-blur-sm" }}>
            <div className="px-4 py-2"><Steps current={currentStep} items={steps.map(item => ({ title: item.title, icon: item.icon }))} className="vendor-setup-steps"/></div>
          </CommonCard>
        </div>
        <Formik initialValues={initialValues} validationSchema={StoreSchema} onSubmit={handleSubmit} validateOnChange={false} validateOnBlur={true}>
          {({ values, errors, touched, setFieldTouched, validateForm, setTouched }) => (
            <Form className="space-y-10">
              {currentStep === 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <CommonFormSection title="Store Identity" description="This is how customers will find and recognize you." row={{ gutter: [24, 24] }}>
                    <CommonValidationTextField name="name" label="Store Name" placeholder="e.g. Blue Pottery Shop" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="slug" label="Public URL Slug" placeholder="blue-pottery-shop" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="subdomain" label="Subdomain" placeholder="bluepottery" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="email" label="Contact Email" type="email" placeholder="sales@mystore.com" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="phone" label="Contact Phone" placeholder="9876543210" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="description" label="Short Description" placeholder="Briefly describe what you sell..." col={{ xs: 24 }} multiline />
                  </CommonFormSection>
                </div>
              )}

              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <CommonFormSection title="Business Legal Information" description="Required for compliance and payouts." row={{ gutter: [24, 24] }}>
                    <CommonValidationTextField name="businessName" label="Legal Business Name" placeholder="Full Registered Name" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="businessType" label="Business Type" placeholder="e.g. Retailer" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="gstNumber" label="GST Number (Optional)" placeholder="GSTIN" col={{ xs: 24, md: 12 }} />
                    <CommonValidationTextField name="panNumber" label="PAN Number (Optional)" placeholder="PAN" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                  <CommonFormSection title="Identity Verification" row={{ gutter: [24, 24], align: "bottom" }}>
                    <CommonValidationSelect name="kycDocuments.type" label="Select Document Type" options={KYC_DOCUMENT_TYPE_OPTIONS} col={{ xs: 24, md: 12 }} />
                    <CommonFormImageBox name="kycDocuments.documentUrl" label="Upload ID Document (PDF)" type="pdf" col={{ flex: "auto" }} />
                  </CommonFormSection>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <CommonFormSection title="Location & Branding" row={{ gutter: [24, 24] }}>
                    <CommonValidationTextField name="address.addressLine1" label="Registered Address" placeholder="Suite, Building, Street" col={{ xs: 24 }} />
                    <CommonValidationTextField name="address.city" label="City" placeholder="City" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="address.state" label="State" placeholder="State" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="address.pincode" label="Pincode" placeholder="Pincode" col={{ xs: 24, md: 8 }} />
                  </CommonFormSection>
                  <CommonFormSection title="Visual Identity" description="Upload images to make your store stand out." row={{ gutter: [24, 24] }}>
                    <CommonFormImageBox name="logo" label="Store Logo" type="image" col={{ xs: 24, md: 12 }} />
                    <CommonFormImageBox name="banner" label="Profile Banner" type="image" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                  <Button size="large" icon={<RiArrowLeftSLine />} disabled={currentStep === 0 || isPending}onClick={() => setCurrentStep(prev => prev - 1)}className="rounded-xl border-slate-200 h-12 px-6 font-medium text-slate-600">Back</Button>
                  {currentStep < steps.length - 1 ? (
                    <Button type="primary" size="large" className="bg-brand-600 hover:bg-brand-700 border-none rounded-xl h-12 px-10 font-bold shadow-lg shadow-brand-100 flex items-center"onClick={async () => {const errs = await validateForm();const fieldsByStep = [['name', 'slug', 'subdomain', 'email', 'phone'],['businessName', 'businessType'],[]];
                        const currentFields = fieldsByStep[currentStep];
                        const hasErrors = currentFields.some(f => errs[f as keyof typeof errs]);
                        if (!hasErrors) {
                          setCurrentStep(prev => prev + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const touchedFields = currentFields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
                          setTouched({ ...touched, ...touchedFields });
                          message.error("Please fill all required fields correctly.");
                        }
                      }}
                    >Continue <RiArrowRightSLine className="ml-2" />
                    </Button>
                  ) : (
                    <Button  type="primary"  size="large"  htmlType="submit" loading={isPending} icon={<RiRocketLine />} className="bg-brand-600 hover:bg-brand-700 border-none rounded-xl h-12 px-12 font-bold shadow-lg shadow-brand-200 flex items-center">Launch My Store</Button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default StoreSetupPage;
