'use client';

import { useEffect, useState } from 'react'; 
import LoadingSpinner from '../../../components/LoadingSpinner';
import AddSkills from '@/components/profile/AddSkills';
import AddExperience from '@/components/profile/AddExperience';
import AddEducation from '@/components/profile/AddEducation';
import AddProject from '@/components/profile/AddProject';
import AddCertificate from '@/components/profile/AddCertificate';
import AddBasicInfo from '@/components/profile/AddBasicInfo';
import { useAuth } from '@/lib/auth'
 
export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);

  const { profile, checkProfile, loading } = useAuth();

  useEffect(() => {

    if (!loading) {

      setUserProfile(profile);
    }
  }, [profile, loading]);


 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>);

  }

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Profile

        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your professional information and credentials
        </p>
      </div>

     
      {/* Profile Sections */}
      <div className="space-y-6 md:space-y-8">
        {/* Basic Information */}
        <AddBasicInfo setProfile={setUserProfile} profile={userProfile} />
<hr className='md:hidden'></hr>
        {/* Experience */}
        <AddExperience setProfile={setUserProfile} profile={userProfile} />
<hr className='md:hidden'></hr>
        {/* Education */}
        <AddEducation setProfile={setUserProfile} profile={userProfile} />
<hr className='md:hidden'></hr>
        {/* Skills */}
        <AddSkills setProfile={setUserProfile} profile={userProfile} />
<hr className='md:hidden'></hr>
        {/* Projects */}
        <AddProject setProfile={setUserProfile} profile={userProfile} />
<hr className='md:hidden'></hr>
        {/* Certificates */}
        <AddCertificate setProfile={setUserProfile} profile={userProfile} />
      </div>
    </div>
  );

}