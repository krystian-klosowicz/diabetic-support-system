import { Role } from './role.enum';

export interface MyProfile {
  role: Role;
  pesel: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: {
    id: number;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
  };
  assignedDoctor: DoctorProfileResponse | null;
  diabetesType: string | null;
  pwzNumber: string | null;
  safetyNumber: string | null;
}

interface DoctorProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  pwzNumber: string;
  phoneNumber: string;
}
