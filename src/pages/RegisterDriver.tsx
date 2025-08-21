import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDriver, uploadFile } from '../http/api';

const initialDriverProfile = {
  name: '',
  natioanl_id: '',
  address: '',
  license_no: '',
  license_expiry: '',
  dob: '',
  driver_img: '',
  driving_license_file: '',
  criminal_record_certificate: '',
  medical_fitness_report: '',
  terms_accepted: false,
  language_preference: 'en',
};

const initialVehicleProfile = {
  car_make: '',
  car_model: '',
  car_year: '',
  license_plate: '',
  vehicle_registration_no: '',
  vehicle_color: '',
  vehicle_type: '',
  vehicle_registration_file: '',
  insurance_file: '',
  periodic_vehicle_inspection_file: '',
  vehicle_pictures: [],
};

const RegisterDriver: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCarOwner, setIsCarOwner] = useState(true);
  const [driverProfile, setDriverProfile] = useState({ ...initialDriverProfile });
  const [vehicleProfile, setVehicleProfile] = useState({ ...initialVehicleProfile });
  const [vehiclePicturesFiles, setVehiclePicturesFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle file upload and get URL
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await uploadFile(formData);
    return res.url;
  };

  // Handle vehicle pictures upload
  const handleVehiclePicturesUpload = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await handleFileUpload(file);
      urls.push(url);
    }
    return urls;
  };

  // Validate form
  const validate = () => {
    if (!phone.match(/^\+?[0-9]{10,15}$/)) return 'Phone must be 10-15 digits.';
    if (!password || password.length < 6) return 'Password must be at least 6 characters.';
    if (!driverProfile.name) return 'Name is required.';
    if (!driverProfile.natioanl_id || driverProfile.natioanl_id.length !== 13) return 'National ID must be 13 digits.';
    if (!driverProfile.address) return 'Address is required.';
    if (!driverProfile.license_no) return 'License number is required.';
    if (!driverProfile.license_expiry) return 'License expiry is required.';
    if (!driverProfile.dob) return 'Date of birth is required.';
    if (!driverProfile.driver_img) return 'Driver image is required.';
    if (!driverProfile.driving_license_file) return 'Driving license file is required.';
    if (!driverProfile.criminal_record_certificate) return 'Criminal record certificate is required.';
    if (!driverProfile.medical_fitness_report) return 'Medical fitness report is required.';
    if (!driverProfile.terms_accepted) return 'You must accept the terms.';
    if (isCarOwner) {
      for (const key of ['car_make', 'car_model', 'car_year', 'license_plate', 'vehicle_registration_no', 'vehicle_color', 'vehicle_type', 'vehicle_registration_file', 'insurance_file', 'periodic_vehicle_inspection_file']) {
        if (!(vehicleProfile as any)[key]) return `Vehicle field ${key.replace(/_/g, ' ')} is required.`;
      }
      if (!vehiclePicturesFiles.length) return 'At least one vehicle picture is required.';
    }
    return null;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      // Upload vehicle pictures if car owner
      // let vehiclePicturesUrls: string[] = [];
      // if (isCarOwner && vehiclePicturesFiles.length) {
      //   vehiclePicturesUrls = await handleVehiclePicturesUpload(vehiclePicturesFiles);
      // }

      // console.log(vehiclePicturesUrls);
      // Prepare payload
      const payload: any = {
        phone,
        password,
        is_car_owner: isCarOwner,
        driver_profile: { ...driverProfile },
      };
      if (isCarOwner) {
        payload.vehicle_profile = {
          ...vehicleProfile,
          vehicle_pictures: vehiclePicturesFiles, 
        };
      }
      // Register driver
      await registerDriver(payload);
      setSuccess(true);
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file input changes for driver profile
  const handleDriverFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof initialDriverProfile) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      setDriverProfile((prev) => ({ ...prev, [field]: url }));
    }
  };

  // Handle file input changes for vehicle profile
  const handleVehicleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof initialVehicleProfile) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      setVehicleProfile((prev) => ({ ...prev, [field]: url }));
    }
  };

  // Handle vehicle pictures (multiple)
  // const handleVehiclePicturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setVehiclePicturesFiles(Array.from(e.target.files));
  //   }
  // };
const handleVehiclePicturesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    // Upload all files and get URLs
    const urls: string[] = [];
    for (const file of files) {
      const url = await handleFileUpload(file);
      urls.push(url);
    }
    setVehiclePicturesFiles(urls);
    // setVehicleProfile(prev => ({
      // ...prev,
      // vehicle_pictures: [...urls]
    // }));
  }
};

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6">Register as Driver</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">Registration successful! Redirecting to login...</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Phone</label>
            <input type="text" className="w-full border p-2 rounded" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Are you a car owner?</label>
          <select className="w-full border p-2 rounded" value={isCarOwner ? 'yes' : 'no'} onChange={e => setIsCarOwner(e.target.value === 'yes')}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" className="w-full border p-2 rounded" value={driverProfile.name} onChange={e => setDriverProfile(prev => ({ ...prev, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">National ID</label>
            <input type="text" className="w-full border p-2 rounded" value={driverProfile.natioanl_id} onChange={e => setDriverProfile(prev => ({ ...prev, natioanl_id: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input type="text" className="w-full border p-2 rounded" value={driverProfile.address} onChange={e => setDriverProfile(prev => ({ ...prev, address: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">License No</label>
            <input type="text" className="w-full border p-2 rounded" value={driverProfile.license_no} onChange={e => setDriverProfile(prev => ({ ...prev, license_no: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">License Expiry</label>
            <input type="date" className="w-full border p-2 rounded" value={driverProfile.license_expiry} onChange={e => setDriverProfile(prev => ({ ...prev, license_expiry: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input type="date" className="w-full border p-2 rounded" value={driverProfile.dob} onChange={e => setDriverProfile(prev => ({ ...prev, dob: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Driver Image</label>
            <input type="file" accept="image/*" className="w-full" onChange={e => handleDriverFileChange(e, 'driver_img')} required />
            {driverProfile.driver_img && <a href={driverProfile.driver_img} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
          </div>
          <div>
            <label className="block font-medium mb-1">Driving License File</label>
            <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleDriverFileChange(e, 'driving_license_file')} required />
            {driverProfile.driving_license_file && <a href={driverProfile.driving_license_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
          </div>
          <div>
            <label className="block font-medium mb-1">Criminal Record Certificate</label>
            <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleDriverFileChange(e, 'criminal_record_certificate')} required />
            {driverProfile.criminal_record_certificate && <a href={driverProfile.criminal_record_certificate} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
          </div>
          <div>
            <label className="block font-medium mb-1">Medical Fitness Report</label>
            <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleDriverFileChange(e, 'medical_fitness_report')} required />
            {driverProfile.medical_fitness_report && <a href={driverProfile.medical_fitness_report} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
          </div>
          <div>
            <label className="block font-medium mb-1">Language Preference</label>
            <select className="w-full border p-2 rounded" value={driverProfile.language_preference} onChange={e => setDriverProfile(prev => ({ ...prev, language_preference: e.target.value }))}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div className="flex items-center mt-2">
            <input type="checkbox" checked={driverProfile.terms_accepted} onChange={e => setDriverProfile(prev => ({ ...prev, terms_accepted: e.target.checked }))} className="mr-2" />
            <label className="text-sm">I accept the terms and conditions</label>
          </div>
        </div>
        {isCarOwner && (
          <>
            <h3 className="text-lg font-semibold mt-6">Vehicle Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Car Make</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.car_make} onChange={e => setVehicleProfile(prev => ({ ...prev, car_make: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Car Model</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.car_model} onChange={e => setVehicleProfile(prev => ({ ...prev, car_model: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Car Year</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.car_year} onChange={e => setVehicleProfile(prev => ({ ...prev, car_year: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">License Plate</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.license_plate} onChange={e => setVehicleProfile(prev => ({ ...prev, license_plate: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Registration No</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.vehicle_registration_no} onChange={e => setVehicleProfile(prev => ({ ...prev, vehicle_registration_no: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Color</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.vehicle_color} onChange={e => setVehicleProfile(prev => ({ ...prev, vehicle_color: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Type</label>
                <input type="text" className="w-full border p-2 rounded" value={vehicleProfile.vehicle_type} onChange={e => setVehicleProfile(prev => ({ ...prev, vehicle_type: e.target.value }))} required={isCarOwner} />
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Registration File</label>
                <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleVehicleFileChange(e, 'vehicle_registration_file')} required={isCarOwner} />
                {vehicleProfile.vehicle_registration_file && <a href={vehicleProfile.vehicle_registration_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
              </div>
              <div>
                <label className="block font-medium mb-1">Insurance File</label>
                <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleVehicleFileChange(e, 'insurance_file')} required={isCarOwner} />
                {vehicleProfile.insurance_file && <a href={vehicleProfile.insurance_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
              </div>
              <div>
                <label className="block font-medium mb-1">Periodic Vehicle Inspection File</label>
                <input type="file" accept="application/pdf,image/*" className="w-full" onChange={e => handleVehicleFileChange(e, 'periodic_vehicle_inspection_file')} required={isCarOwner} />
                {vehicleProfile.periodic_vehicle_inspection_file && <a href={vehicleProfile.periodic_vehicle_inspection_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View</a>}
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Pictures</label>
                <input type="file" accept="image/*" className="w-full" multiple onChange={handleVehiclePicturesChange} required={isCarOwner} />
                {vehiclePicturesFiles?.length > 0 && vehiclePicturesFiles.map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs mr-2">View {idx + 1}</a>
                ))}
              </div>
            </div>
          </>
        )}
        <button type="submit" className="w-full bg-[#e3c28d] hover:bg-[#caac7c] text-black font-semibold py-3 rounded-lg transition-colors" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterDriver; 