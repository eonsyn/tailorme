import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Loader2, Save } from "lucide-react";

function AddBasicInfo({ profile, setProfile }) {
  const [saving, setSaving] = useState(false);

  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData(e.target);

      const social = [
        { network: "LinkedIn", url: formData.get("linkedin") },
        { network: "GitHub", url: formData.get("github") },
        { network: "Portfolio", url: formData.get("portfolio") },
        { network: "Twitter", url: formData.get("twitter") },
      ].filter((s) => s.url);

      const basicInfo = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        title: formData.get("title"),
        summary: formData.get("summary"),
        social,
      };

      await api.put("/profile/basic", basicInfo);
      setProfile({ ...profile, ...basicInfo });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="md:card md:p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Basic Information
      </h2>

      <form onSubmit={handleBasicInfoSubmit} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Full Name */}
        <div className="md:col-span-1 lg:col-span-1">
          <label className="input-label">Full Name <span className="text-sm text-gray-500">(+10 score)</span></label>
          <input
            type="text"
            name="name"
            defaultValue={profile?.name || ""}
            className="input"
            required
          />
        </div>

        {/* Email */}
        <div className="md:col-span-1 lg:col-span-1">
  <label htmlFor="email" className="input-label">
    Email <span className="text-sm text-gray-500">(+10 score)</span>
  </label>
  <input
    id="email"
    type="email"
    name="email"
    defaultValue={profile?.email || ""}
    className="input"
    placeholder="Enter your email"
    required
  />
</div>


        {/* Phone */}
        <div className="md:col-span-1 lg:col-span-1">
          <label className="input-label">Phone <span className="text-sm text-gray-500">(+5 score)</span></label>
          <input
            type="tel"
            name="phone"
            defaultValue={profile?.phone || ""}
            className="input"
          />
        </div>

        {/* Professional Title */}
        <div className="md:col-span-1 lg:col-span-2">
          <label className="input-label">Professional Title <span className="text-sm text-gray-500">(+10 score)</span></label>
          <input
            type="text"
            name="title"
            defaultValue={profile?.title || ""}
            className="input"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        {/* Location */}
        <div className="md:col-span-1 lg:col-span-1">
          <label className="input-label">Location <span className="text-sm text-gray-500">(+5 score)</span></label>
          <input
            type="text"
            name="location"
            defaultValue={profile?.location || ""}
            className="input"
            placeholder="City, State"
          />
        </div>

        {/* Social Links */}
        <div className="md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-medium text-foreground mb-4">Social Links <span className="text-sm text-gray-500">(+3 score)</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* LinkedIn */}
            <div>
              <label className="input-label">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                defaultValue={
                  profile?.social?.find((s) => s.network === "LinkedIn")?.url || ""
                }
                className="input"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            {/* GitHub */}
            <div>
              <label className="input-label">GitHub</label>
              <input
                type="url"
                name="github"
                defaultValue={
                  profile?.social?.find((s) => s.network === "GitHub")?.url || ""
                }
                className="input"
                placeholder="https://github.com/username"
              />
            </div>
            {/* Portfolio */}
            <div>
              <label className="input-label">Portfolio</label>
              <input
                type="url"
                name="portfolio"
                defaultValue={
                  profile?.social?.find((s) => s.network === "Portfolio")?.url || ""
                }
                className="input"
                placeholder="https://yourportfolio.com"
              />
            </div>
            {/* Twitter */}
            <div>
              <label className="input-label">Twitter</label>
              <input
                type="url"
                name="twitter"
                defaultValue={
                  profile?.social?.find((s) => s.network === "Twitter")?.url || ""
                }
                className="input"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="input-label">Professional Summary <span className="text-sm text-gray-500">(+5 score)</span></label>
          <textarea
            name="summary"
            defaultValue={profile?.summary || ""}
            rows={4}
            className="input resize-none"
            placeholder="Brief overview of your professional background..."
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-2 lg:col-span-3 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBasicInfo;