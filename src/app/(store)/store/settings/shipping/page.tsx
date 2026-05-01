"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonModal } from "@/components/common";
import { ShippingSettingFormValues, ShippingSettingResponse } from "@/type";
import { ShippingSettingSchema } from "@/utils";
import { Checkbox, Dropdown, MenuProps, Popconfirm } from "antd";
import { Form, Formik, FormikHelpers, FieldArray } from "formik";
import { useState } from "react";
import { FiMoreVertical, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import ShippingSettingOverview from "./ShippingSettingOverview";

const ShippingSettingsPage = () => {
  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: shippingData, isLoading: isShippingLoading } = Queries.useGetShippingSetting(storeId);
  const settings: ShippingSettingResponse[] = shippingData?.data || [];

  const { mutate: addShipping, isPending: isAddLoading } = Mutations.useAddShippingSetting();
  const { mutate: editShipping, isPending: isEditLoading } = Mutations.useEditShippingSetting();
  const { mutate: deleteShipping } = Mutations.useDeleteShippingSetting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingSetting = settings.find(s => s._id === editingId);

  const initialValues: ShippingSettingFormValues = {
    zoneName: editingSetting?.zoneName || "",
    countries: editingSetting?.countries || [],
    rates: editingSetting?.rates || [{ name: "Standard Shipping", price: 0 }],
    isActive: editingSetting?.isActive ?? true,
  };

  const handleSubmit = (values: ShippingSettingFormValues, { resetForm }: FormikHelpers<ShippingSettingFormValues>) => {
    if (!storeId) return;

    if (editingId) {
      editShipping(
        { ...values, storeId, shippingSettingId: editingId },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingId(null);
            resetForm();
          },
        }
      );
    } else {
      addShipping(
        { ...values, storeId },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            resetForm();
          },
        }
      );
    }
  };

  const removeShipping = (shippingSettingId: string) => {
    if (!storeId) return;
    deleteShipping({ shippingSettingId, storeId });
  };

  const getMenuProps = (setting: ShippingSettingResponse): MenuProps => {
    return {
      items: [
        {
          key: "edit",
          label: "Edit Zone",
          icon: <FiEdit2 />,
          onClick: () => {
            setEditingId(setting._id);
            setIsModalOpen(true);
          },
        },
        {
          type: "divider",
        },
        {
          key: "delete",
          danger: true,
          label: (
            <Popconfirm
              title="Delete Zone"
              description="Are you sure you want to delete this shipping zone?"
              onConfirm={() => removeShipping(setting._id)}
              okText="Yes, Delete"
              cancelText="Cancel"
            >
              <div className="w-full text-left flex items-center gap-2"><FiTrash2 /> Delete Zone</div>
            </Popconfirm>
          ),
        },
      ],
    };
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Shipping Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Delivery Zones & Rates</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Configure where you ship and how much you charge for delivery.</p>
          </div>
          <CommonButton onClick={() => { setEditingId(null); setIsModalOpen(true); }} size="middle" type="primary">
            <span className="flex items-center gap-1.5"><FiPlus size={16} /> Add Zone</span>
          </CommonButton>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: "Shipping Zones",
          loading: isShippingLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        <div className="space-y-4">
          <ShippingSettingOverview 
            settings={settings} 
            getMenuProps={getMenuProps} 
            setIsModalOpen={setIsModalOpen} 
            setEditingId={setEditingId}
          />
        </div>
      </CommonCard>

      <CommonModal
        open={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingId(null); }}
        title={editingId ? "Edit Shipping Zone" : "Add Shipping Zone"}
        width={700}
      >
        <Formik<ShippingSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={ShippingSettingSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-6 pt-2">
              
              <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <CommonValidationTextField 
                    name="zoneName" 
                    label="Zone Name" 
                    placeholder="e.g. Domestic, International, Europe" 
                    required 
                    col={{ span: 24 }} 
                  />
                </div>
                
                {/* Simplified Countries - we can improve this with a multi-select later */}
                <div>
                  <CommonValidationTextField 
                    name="countries[0]" 
                    label="Country / Region" 
                    placeholder="e.g. India" 
                    col={{ span: 24 }} 
                  />
                </div>

                <div className="flex items-center mt-2 cursor-pointer" onClick={() => setFieldValue('isActive', !values.isActive)}>
                  <Checkbox checked={values.isActive} onChange={(e) => setFieldValue('isActive', e.target.checked)} className="mr-2" />
                  <span className="text-sm font-medium text-slate-700">Enable this shipping zone</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800 text-sm">Shipping Rates</h3>
                </div>
                
                <FieldArray name="rates">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.rates.map((rate, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg relative bg-white shadow-sm">
                          {values.rates.length > 1 && (<button type="button" onClick={() => remove(index)}className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={16} /></button>)}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CommonValidationTextField name={`rates.${index}.name`} label="Rate Name" placeholder="e.g. Standard, Express" required col={{ span: 24 }} />
                            <CommonValidationTextField name={`rates.${index}.price`} label="Price" type="number" placeholder="0.00" required col={{ span: 24 }} />
                            <CommonValidationTextField name={`rates.${index}.minOrderValue`} label="Min Order Value (Optional)" type="number" placeholder="0.00" col={{ span: 24 }} />
                            <CommonValidationTextField name={`rates.${index}.maxOrderValue`} label="Max Order Value (Optional)" type="number" placeholder="0.00" col={{ span: 24 }} />
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" onClick={() => push({ name: "", price: 0 })} className="w-full py-3 border border-dashed border-brand-300 rounded-lg text-brand-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"><FiPlus /> Add Another Rate</button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <CommonButton onClick={() => { setIsModalOpen(false); setEditingId(null); }} title="Cancel" variant="dashed" color="default" />
                <CommonButton title={editingId ? "Save Changes" : "Add Zone"} type="primary" htmlType="submit" loading={isAddLoading || isEditLoading} />
              </div>
            </Form>
          )}
        </Formik>
      </CommonModal>

    </div>
  );
};

export default ShippingSettingsPage;
