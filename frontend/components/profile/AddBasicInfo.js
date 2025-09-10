import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import LoadingSpinner from "../LoadingSpinner";

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
      ].filter((s) => s.url); // keep only filled ones

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
    <div className="card p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Basic Information
      </h2>

      <form
        onSubmit={handleBasicInfoSubmit}
        className="grid md:grid-cols-3 gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={profile?.name || ""}
            className="input"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={profile?.email || ""}
            className="input"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={profile?.phone || ""}
            className="input"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={profile?.location || ""}
            className="input"
            placeholder="City, State"
          />
           <div className="md:col-span-2 mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={profile?.title || ""}
            className="input"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>
        </div>

        {/* Social Links */}
        <div className="md:col-span-2">
           

          <div className="grid gap-4">
            {/* LinkedIn + GitHub */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  defaultValue={
                    profile?.social?.find((s) => s.network === "LinkedIn")?.url ||
                    ""
                  }
                  className="input w-full"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  defaultValue={
                    profile?.social?.find((s) => s.network === "GitHub")?.url ||
                    ""
                  }
                  className="input w-full"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            {/* Portfolio + Twitter */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Portfolio
                </label>
                <input
                  type="url"
                  name="portfolio"
                  defaultValue={
                    profile?.social?.find((s) => s.network === "Portfolio")?.url ||
                    ""
                  }
                  className="input w-full"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  defaultValue={
                    profile?.social?.find((s) => s.network === "Twitter")?.url ||
                    ""
                  }
                  className="input w-full"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>
        </div>

         {/* Summary */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            name="summary"
            defaultValue={profile?.summary || ""}
            rows={4}
            className="input resize-none"
            placeholder="Brief overview of your professional background..."
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary flex items-center"
          >
            {saving ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : null}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBasicInfo;
