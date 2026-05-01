import { FC } from "react";

interface StoreSettingOverviewProps {
  Data: any;
  activeStore: any;
}

export const StoreSettingOverview: FC<StoreSettingOverviewProps> = ({ Data, activeStore }) => {
  const displayData = {
    name: Data?.name || activeStore?.name || "-",
    email: Data?.email || activeStore?.email || "-",
    phone: Data?.phone || activeStore?.phone || "-",
    logo: Data?.logo || (activeStore?.logo && activeStore.logo.length > 0 ? activeStore.logo[0] : null) || null,
    banner: Data?.banner || (activeStore?.banner && activeStore.banner.length > 0 ? activeStore.banner[0] : null) || null,
    favicon: Data?.favicon || null,
    address: {
      line1: Data?.address?.line1 || activeStore?.address?.addressLine1 || "-",
      line2: Data?.address?.line2 || activeStore?.address?.addressLine2 || "-",
      city: Data?.address?.city || activeStore?.address?.city || "-",
      state: Data?.address?.state || activeStore?.address?.state || "-",
      zipCode: Data?.address?.zipCode || activeStore?.address?.pincode || "-",
      country: Data?.address?.country || activeStore?.address?.country || "-",
    },
    socialLinks: {
      facebook: Data?.socialLinks?.facebook || activeStore?.socialLinks?.facebook || "-",
      instagram: Data?.socialLinks?.instagram || activeStore?.socialLinks?.instagram || "-",
      twitter: Data?.socialLinks?.twitter || activeStore?.socialLinks?.twitter || "-",
      youtube: Data?.socialLinks?.youtube || activeStore?.socialLinks?.youtube || "-",
      linkedin: Data?.socialLinks?.linkedin || activeStore?.socialLinks?.linkedin || "-",
    },
  };

  return (
    <div className="space-y-4 text-sm">

      {/* Basic Details + Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Details */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Basic Details</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="flex items-center px-5 py-3">
              <span className="text-slate-500 text-xs w-28 shrink-0">Store Name</span>
              <span className="font-medium text-slate-700 text-sm">{displayData.name}</span>
            </div>
            <div className="flex items-center px-5 py-3">
              <span className="text-slate-500 text-xs w-28 shrink-0">Email</span>
              <span className="font-medium text-slate-700 text-sm">{displayData.email}</span>
            </div>
            <div className="flex items-center px-5 py-3">
              <span className="text-slate-500 text-xs w-28 shrink-0">Phone</span>
              <span className="font-medium text-slate-700 text-sm">{displayData.phone}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Address</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Line 1", value: displayData.address.line1 },
              { label: "Line 2", value: displayData.address.line2 },
              { label: "City", value: displayData.address.city },
              { label: "State", value: displayData.address.state },
              { label: "Country", value: displayData.address.country },
              { label: "Zip Code", value: displayData.address.zipCode },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center px-5 py-3">
                <span className="text-slate-500 text-xs w-28 shrink-0">{label}</span>
                <span className="font-medium text-slate-700 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Social Links</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { label: "Facebook", value: displayData.socialLinks.facebook },
            { label: "Instagram", value: displayData.socialLinks.instagram },
            { label: "Twitter", value: displayData.socialLinks.twitter },
            { label: "YouTube", value: displayData.socialLinks.youtube },
            { label: "LinkedIn", value: displayData.socialLinks.linkedin },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col px-5 py-4 gap-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wide">{label}</span>
              <span className="font-medium text-slate-700 text-sm truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Media */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Media</h3>
        </div>
        <div className="flex flex-wrap gap-8 px-5 py-5">
          {[
            { label: "Logo", src: displayData.logo, cls: "h-20 w-20 object-contain" },
            { label: "Banner", src: displayData.banner, cls: "h-20 w-44 object-cover" },
            { label: "Favicon", src: displayData.favicon, cls: "h-20 w-20 object-contain" },
          ].map(({ label, src, cls }) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wide">{label}</span>
              {src
                ? <img src={src} alt={label} className={`${cls} rounded-lg border border-slate-200 bg-white p-1`} />
                : <div className={`${cls.includes("w-44") ? "w-44" : "w-20"} h-20 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-500`}>No image</div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
