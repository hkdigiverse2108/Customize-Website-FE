import { CheckoutSettingResponse } from "@/type";
import { FiCheckCircle, FiXCircle, FiShoppingCart } from "react-icons/fi";

interface CheckoutSettingOverviewProps {
  Data: CheckoutSettingResponse;
}

const CheckoutSettingOverview = ({ Data }: CheckoutSettingOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-brand-200 bg-brand-50/20 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FiShoppingCart size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Checkout Configuration</h3>
              <p className="text-xs text-slate-500 mt-0.5">Customize your customers' checkout experience</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mt-5 pt-5 border-t border-slate-100">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Customer Accounts</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm capitalize">{Data?.customerAccounts || "Optional"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Customer Contact Method</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm capitalize">{Data?.contactMethod?.replace(/_/g, ' ') || "Email"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Guest Checkout</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><span className="flex items-center gap-1.5">
              {Data?.allowGuestCheckout ? <><FiCheckCircle className="text-emerald-500" /> Allowed</> : <><FiXCircle className="text-red-500" /> Disabled</>}
            </span></p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number Requirement</p>
            <p className="text-sm font-medium text-slate-900 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><span className="flex items-center gap-1.5">
              {Data?.requirePhoneNumber ? <><FiCheckCircle className="text-emerald-500" /> Required</> : <><FiXCircle className="text-slate-400" /> Optional</>}
            </span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white transition-all">
          <h3 className="font-semibold text-slate-900 text-sm mb-4">Order Processing</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Shipping & Billing Address</p>
              <p className="text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100"><span className="flex items-center gap-1.5">
                {Data?.orderProcessing?.useShippingAsBillingByDefault ? <><FiCheckCircle className="text-emerald-500" /> Same by default</> : <><FiXCircle className="text-slate-400" /> Different</>}
              </span></p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Address Autocompletion</p>
              <p className="text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100"><span className="flex items-center gap-1.5">
                {Data?.orderProcessing?.enableAddressAutocompletion ? <><FiCheckCircle className="text-emerald-500" /> Enabled</> : <><FiXCircle className="text-slate-400" /> Disabled</>}
              </span></p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white transition-all">
          <h3 className="font-semibold text-slate-900 text-sm mb-4">Abandoned Cart Recovery</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Recovery Emails</p>
              <p className="text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100"><span className="flex items-center gap-1.5">
                {Data?.abandonedCart?.enabled ? <><FiCheckCircle className="text-emerald-500" /> Enabled</> : <><FiXCircle className="text-slate-400" /> Disabled</>}
              </span></p>
            </div>
            {Data?.abandonedCart?.enabled && (
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Send After</p>
                <p className="text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                  {Data?.abandonedCart?.sendEmailAfterHours || 10} hours
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSettingOverview;
