import { CommonButton } from "@/attribute";
import { ShippingSettingResponse } from "@/type";
import { Dropdown, MenuProps, Tag } from "antd";
import { FiMoreVertical, FiTruck, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface ShippingSettingOverviewProps {
  settings: ShippingSettingResponse[];
  getMenuProps: (setting: ShippingSettingResponse) => MenuProps;
  setIsModalOpen: (open: boolean) => void;
  setEditingId: (id: string | null) => void;
}

const ShippingSettingOverview = ({ settings, getMenuProps, setIsModalOpen, setEditingId }: ShippingSettingOverviewProps) => {
  if (settings.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
        <FiTruck className="mx-auto h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">No shipping zones</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
          You haven't configured any shipping zones yet. Click the Add Zone button above to get started.
        </p>
        <div className="mt-6">
          <CommonButton onClick={() => { setEditingId(null); setIsModalOpen(true); }} size="small" type="primary" variant="outlined">
            Add Shipping Zone
          </CommonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {settings.map((setting) => (
        <div key={setting._id} className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col relative transition-all hover:shadow-md">
          
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-start">
            <div className="flex items-center gap-3 truncate">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <FiMapPin size={20} />
              </div>
              <div className="truncate">
                <h4 className="font-semibold text-slate-900 text-[15px] truncate" title={setting.zoneName}>{setting.zoneName}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[11px] font-medium uppercase tracking-wide flex items-center gap-1 ${setting.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {setting.isActive ? <><FiCheckCircle size={12} /> Active</> : <><FiXCircle size={12} /> Inactive</>}
                  </span>
                  <span className="text-[10px] text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500">{setting.countries?.length || 0} Countries</span>
                </div>
              </div>
            </div>
            
            <Dropdown menu={getMenuProps(setting)} trigger={['click']} placement="bottomRight">
              <button className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0">
                <FiMoreVertical size={16} />
              </button>
            </Dropdown>
          </div>

          {/* Card Body - Rates */}
          <div className="p-0 flex-1 flex flex-col justify-center bg-slate-50/50">
            {setting.rates && setting.rates.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {setting.rates.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <span className="text-sm text-slate-700 font-medium">{rate.name}</span>
                      {(rate.minOrderValue || rate.maxOrderValue) && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {rate.minOrderValue ? `Min: ${rate.minOrderValue}` : ''} 
                          {rate.minOrderValue && rate.maxOrderValue ? ' - ' : ''} 
                          {rate.maxOrderValue ? `Max: ${rate.maxOrderValue}` : ''}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {rate.price === 0 ? <Tag color="success" variant="filled" className="m-0">Free</Tag> : `₹${rate.price}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-6 text-center text-sm text-slate-400 italic">
                No shipping rates configured for this zone
              </div>
            )}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default ShippingSettingOverview;
