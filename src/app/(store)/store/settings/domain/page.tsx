"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonModal } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { DomainSettingFormValues, DomainSettingResponse } from "@/type";
import { DomainSettingSchema } from "@/utils";
import { Checkbox, Tag, Dropdown, MenuProps, Popconfirm } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiPlus, FiGlobe } from "react-icons/fi";
import DomainSettingOverview from "./DomainSettingOverview";

const DomainSettingsPage = () => {
  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: domainData, isLoading: isDomainsLoading } = Queries.useGetDomainSetting(storeId);
  const domains: DomainSettingResponse[] = domainData?.data || [];

  const { mutate: addDomain, isPending: isAddLoading } = Mutations.useAddDomainSetting();
  const { mutate: editDomain } = Mutations.useEditDomainSetting();
  const { mutate: deleteDomain } = Mutations.useDeleteDomainSetting();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: DomainSettingFormValues = {
    domain: "",
    isPrimary: domains.length === 0, // Auto-select primary if it's the first one
  };

  const handleSubmit = (values: DomainSettingFormValues, { resetForm }: FormikHelpers<DomainSettingFormValues>) => {
    if (!storeId) return;

    addDomain(
      { ...values, storeId },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          resetForm();
        },
      }
    );
  };

  const setPrimary = (domainSettingId: string) => {
    if (!storeId) return;
    editDomain({ domainSettingId, storeId, isPrimary: true });
  };

  const removeDomain = (domainSettingId: string) => {
    if (!storeId) return;
    deleteDomain({ domainSettingId, storeId });
  };

  const getMenuProps = (domain: DomainSettingResponse): MenuProps => {
    return {
      items: [
        { key: "primary",label: "Set as Primary",disabled: domain.isPrimary,onClick: () => setPrimary(domain._id), },
        { type: "divider" },
        {key: "delete",danger: true,label: (<Popconfirm title="Remove Domain" description="Are you sure you want to remove this domain?" onConfirm={() => removeDomain(domain._id)} okText="Yes, Remove" cancelText="Cancel"><div className="w-full text-left">Remove Domain</div></Popconfirm>),},
      ],
    };
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Domain Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Manage Domains</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Connect a custom domain to your store to strengthen your brand identity.</p>
          </div>
          <CommonButton onClick={() => setIsModalOpen(true)} size="middle" type="primary">
            <span className="flex items-center gap-1.5"><FiPlus size={16} /> Add Domain</span>
          </CommonButton>
        </div>
      </div>

      <CommonCard cardProps={{title:"Connected Domains",loading: isDomainsLoading,extra: (<CommonButton onClick={() => setIsModalOpen(true)} size="small" type="primary"><span className="flex items-center gap-1.5"><FiPlus size={16} /> Add Domain</span></CommonButton>),}}>
        <div className="space-y-4">
          <DomainSettingOverview domains={domains} getMenuProps={getMenuProps} setIsModalOpen={setIsModalOpen}/>
        </div>
      </CommonCard>

      <CommonModal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Connect Custom Domain" width={500}>
        <Formik<DomainSettingFormValues> initialValues={initialValues} validationSchema={DomainSettingSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-6 pt-2">
              <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100">
                <div className="flex items-start gap-3 text-sm text-blue-800">
                  <FiGlobe className="shrink-0 mt-0.5 text-blue-500" size={16} />
                  <p>
                    Enter the domain you want to connect to your store. You will be provided with DNS records to configure in your domain registrar's dashboard after adding it.
                  </p>
                </div>
              </div>

              <div>
                <CommonValidationTextField name="domain" label="Domain Name" placeholder="e.g. www.mystore.com" required col={{ span: 24 }} />
              </div>

              <div className="flex items-center border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFieldValue('isPrimary', !values.isPrimary)}>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900">Set as Primary Domain</h4>
                  <p className="text-xs text-slate-500 mt-1">This will be the main URL visitors see when they browse your store.</p>
                </div>
                <Checkbox 
                  checked={values.isPrimary} 
                  onChange={(e) => setFieldValue('isPrimary', e.target.checked)} 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <CommonButton onClick={() => setIsModalOpen(false)} title="Cancel" variant="dashed" color="default" />
                <CommonButton title="Add Domain" type="primary" htmlType="submit" loading={isAddLoading} />
              </div>
            </Form>
          )}
        </Formik>
      </CommonModal>

    </div>
  );
};

export default DomainSettingsPage;
