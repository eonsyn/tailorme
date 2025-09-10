'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AddSkills from '@/components/profile/AddSkills';
import AddExperience from '@/components/profile/AddExperience';
import AddEducation from '@/components/profile/AddEducation';
import AddProject from '@/components/profile/AddProject';
import AddCertificate from '@/components/profile/AddCertificate';
import AddBasicInfo from '@/components/profile/AddBasicInfo';
export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.get('/profile');
      setProfile(data.profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>);

  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your professional information</p>
      </div>

      {/* Basic Information */}
       <AddBasicInfo setProfile={setProfile} profile={profile} />

      {/* Skills */}
      <AddSkills profile={profile} />


      {/* Experience */}
      <AddExperience profile={profile} />
      {/*Project*/}

      <AddCertificate profile={profile} />
      <AddProject profile={profile} />

      {/* Education */}
      <AddEducation profile={profile} />
    </div>);

}