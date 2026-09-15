export type UserRole = "ADMIN"|"DOCTOR"|"NURSE"|"RECEPTIONIST"|"PATIENT"|"LAB_TECHNICIAN"|"PHARMACIST";
export interface User { id: string; email: string; full_name: string; role: string; phone?: string; }
export interface Department { id: string; name: string; slug: string; description?: string; color: string; icon: string; }
export interface Appointment { id: string; patient_id: string; doctor_id: string; department_id?: string; date: string; time: string; type: string; status: string; reason?: string; }
export interface Patient { id: string; name: string; age?: number; gender?: string; phone?: string; email?: string; blood_group?: string; condition?: string; status?: string; }
