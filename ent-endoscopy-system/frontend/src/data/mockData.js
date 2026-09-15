// MediCore HMS — Mock data for Complete Hospital Management System

export const departments = [
  { id: 'ent', name: 'ENT', fullName: 'ENT (Otolaryngology)', head: 'Dr. Sarah Jenkins', beds: 20, doctors: 5, color: '#e64833', icon: 'Ear' },
  { id: 'cardiology', name: 'Cardiology', fullName: 'Cardiology', head: 'Dr. Arjun Mehta', beds: 30, doctors: 8, color: '#ef4444', icon: 'Heart' },
  { id: 'orthopedics', name: 'Orthopedics', fullName: 'Orthopedics', head: 'Dr. Vikram Singh', beds: 25, doctors: 6, color: '#f59e0b', icon: 'Bone' },
  { id: 'neurology', name: 'Neurology', fullName: 'Neurology', head: 'Dr. Priya Nair', beds: 18, doctors: 4, color: '#8b5cf6', icon: 'Brain' },
  { id: 'pediatrics', name: 'Pediatrics', fullName: 'Pediatrics', head: 'Dr. Kavitha Rao', beds: 22, doctors: 7, color: '#06b6d4', icon: 'Baby' },
  { id: 'oncology', name: 'Oncology', fullName: 'Oncology', head: 'Dr. Ramesh Kumar', beds: 15, doctors: 5, color: '#ec4899', icon: 'Ribbon' },
  { id: 'radiology', name: 'Radiology', fullName: 'Radiology & Imaging', head: 'Dr. Meena Pillai', beds: 8, doctors: 4, color: '#14b8a6', icon: 'Scan' },
  { id: 'emergency', name: 'Emergency', fullName: 'Emergency & Trauma', head: 'Dr. Sameer Khan', beds: 12, doctors: 10, color: '#dc2626', icon: 'Siren' },
  { id: 'gynecology', name: 'Gynecology', fullName: 'Gynecology & Obstetrics', head: 'Dr. Sneha Iyer', beds: 20, doctors: 6, color: '#a855f7', icon: 'HeartHandshake' },
  { id: 'general', name: 'General', fullName: 'General Medicine', head: 'Dr. Anil Verma', beds: 28, doctors: 9, color: '#0a0a0a', icon: 'Stethoscope' },
];

export const mockPatients = [
  { id: 'p1', name: 'Arjun Sharma', age: 34, gender: 'Male', phone: '+91 98765 43210', email: 'arjun@email.com', bloodGroup: 'O+', lastVisit: '2026-07-01', department: 'ent', condition: 'Otitis Media', status: 'admitted', avatar: 'AS' },
  { id: 'p2', name: 'Priya Nair', age: 28, gender: 'Female', phone: '+91 91234 56789', email: 'priya@email.com', bloodGroup: 'A+', lastVisit: '2026-06-28', department: 'cardiology', condition: 'Hypertension', status: 'outpatient', avatar: 'PN' },
  { id: 'p3', name: 'Rahul Mehta', age: 45, gender: 'Male', phone: '+91 87654 32109', email: 'rahul@email.com', bloodGroup: 'B+', lastVisit: '2026-06-25', department: 'orthopedics', condition: 'Fracture Tibia', status: 'admitted', avatar: 'RM' },
  { id: 'p4', name: 'Sneha Iyer', age: 32, gender: 'Female', phone: '+91 94321 09876', email: 'sneha@email.com', bloodGroup: 'AB+', lastVisit: '2026-07-03', department: 'ent', condition: 'Perforated Eardrum', status: 'admitted', avatar: 'SI' },
  { id: 'p5', name: 'Vikram Reddy', age: 52, gender: 'Male', phone: '+91 99876 54321', email: 'vikram@email.com', bloodGroup: 'O-', lastVisit: '2026-07-05', department: 'oncology', condition: 'Lung Nodule', status: 'outpatient', avatar: 'VR' },
  { id: 'p6', name: 'Kavitha Krishnan', age: 41, gender: 'Female', phone: '+91 88765 43210', email: 'kavitha@email.com', bloodGroup: 'A-', lastVisit: '2026-06-30', department: 'gynecology', condition: 'Antenatal Care', status: 'admitted', avatar: 'KK' },
  { id: 'p7', name: 'Amit Patel', age: 60, gender: 'Male', phone: '+91 90001 11111', email: 'amit@email.com', bloodGroup: 'B-', lastVisit: '2026-07-04', department: 'neurology', condition: 'Migraine Chronic', status: 'outpatient', avatar: 'AP' },
  { id: 'p8', name: 'Neha Gupta', age: 7, gender: 'Female', phone: '+91 90002 22222', email: 'neha@email.com', bloodGroup: 'O+', lastVisit: '2026-07-05', department: 'pediatrics', condition: 'Viral Fever', status: 'admitted', avatar: 'NG' },
];

export const mockDoctors = [
  { id: 'd1', name: 'Dr. Sarah Jenkins', specialty: 'ENT Specialist', department: 'ent', hospital: 'MediCore Hospital', rating: 4.9, consultations: 1284, avatar: 'SJ', status: 'approved', license: 'MCI-2019-ENT-4521', experience: 12 },
  { id: 'd2', name: 'Dr. Arjun Mehta', specialty: 'Cardiologist', department: 'cardiology', hospital: 'MediCore Hospital', rating: 4.8, consultations: 956, avatar: 'AM', status: 'approved', license: 'MCI-2016-CAR-3312', experience: 15 },
  { id: 'd3', name: 'Dr. Vikram Singh', specialty: 'Orthopedic Surgeon', department: 'orthopedics', hospital: 'MediCore Hospital', rating: 4.7, consultations: 742, avatar: 'VS', status: 'approved', license: 'MCI-2021-ORT-6621', experience: 10 },
  { id: 'd4', name: 'Dr. Priya Nair', specialty: 'Neurologist', department: 'neurology', hospital: 'MediCore Hospital', rating: 4.9, consultations: 1102, avatar: 'PN', status: 'approved', license: 'MCI-2018-NEU-4421', experience: 11 },
  { id: 'd5', name: 'Dr. Kavitha Rao', specialty: 'Pediatrician', department: 'pediatrics', hospital: 'MediCore Hospital', rating: 4.8, consultations: 880, avatar: 'KR', status: 'approved', license: 'MCI-2017-PED-5521', experience: 9 },
  { id: 'd6', name: 'Dr. Meena Pillai', specialty: 'Radiologist', department: 'radiology', hospital: 'MediCore Hospital', rating: 4.7, consultations: 640, avatar: 'MP', status: 'pending', license: 'MCI-2021-RAD-7721', experience: 8 },
  { id: 'd7', name: 'Dr. Sameer Khan', specialty: 'Emergency Physician', department: 'emergency', hospital: 'MediCore Hospital', rating: 4.85, consultations: 1450, avatar: 'SK', status: 'approved', license: 'MCI-2015-EMR-1121', experience: 14 },
  { id: 'd8', name: 'Dr. Sneha Iyer', specialty: 'Gynecologist', department: 'gynecology', hospital: 'MediCore Hospital', rating: 4.75, consultations: 920, avatar: 'SI', status: 'approved', license: 'MCI-2018-GYN-8821', experience: 10 },
];

export const mockAppointments = [
  { id: 'a1', patientId: 'p1', patientName: 'Arjun Sharma', doctorId: 'd1', doctorName: 'Dr. Sarah Jenkins', department: 'ent', date: '2026-07-08', time: '10:00 AM', type: 'Teleconsult', status: 'confirmed', reason: 'Otitis Media Follow-up' },
  { id: 'a2', patientId: 'p2', patientName: 'Priya Nair', doctorId: 'd2', doctorName: 'Dr. Arjun Mehta', department: 'cardiology', date: '2026-07-08', time: '11:30 AM', type: 'In-Person', status: 'waiting', reason: 'Hypertension Review' },
  { id: 'a3', patientId: 'p3', patientName: 'Rahul Mehta', doctorId: 'd3', doctorName: 'Dr. Vikram Singh', department: 'orthopedics', date: '2026-07-08', time: '02:00 PM', type: 'Teleconsult', status: 'confirmed', reason: 'Fracture Follow-up' },
  { id: 'a4', patientId: 'p4', patientName: 'Sneha Iyer', doctorId: 'd1', doctorName: 'Dr. Sarah Jenkins', department: 'ent', date: '2026-07-09', time: '09:30 AM', type: 'In-Person', status: 'confirmed', reason: 'Eardrum Perforation Review' },
  { id: 'a5', patientId: 'p5', patientName: 'Vikram Reddy', doctorId: 'd4', doctorName: 'Dr. Priya Nair', department: 'neurology', date: '2026-07-09', time: '03:30 PM', type: 'Teleconsult', status: 'pending', reason: 'Lung Nodule Discussion' },
  { id: 'a6', patientId: 'p6', patientName: 'Kavitha Krishnan', doctorId: 'd8', doctorName: 'Dr. Sneha Iyer', department: 'gynecology', date: '2026-07-10', time: '09:00 AM', type: 'In-Person', status: 'confirmed', reason: 'Antenatal Checkup' },
];

export const mockReports = [
  {
    id: 'r1', patientId: 'p1', date: '2026-07-01', doctorName: 'Dr. Sarah Jenkins', department: 'ent',
    diagnosis: 'Acute Otitis Media', aiResult: { label: 'Otitis Media', confidence: 0.94, severity: 'Moderate' },
    medicines: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed', duration: '5 days' },
    ],
    remarks: 'Middle ear infection. Complete the antibiotic course. Follow-up in 1 week.',
    followUp: '2026-07-08',
  },
  {
    id: 'r2', patientId: 'p2', date: '2026-06-28', doctorName: 'Dr. Arjun Mehta', department: 'cardiology',
    diagnosis: 'Hypertension Stage 1', aiResult: { label: 'ECG Normal', confidence: 0.91, severity: 'Mild' },
    medicines: [{ name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }],
    remarks: 'BP 142/90. Lifestyle modification + medication. Low salt diet.',
    followUp: '2026-07-15',
  },
];

export const mockAIResults = [
  {
    id: 'ai1', imageId: 'img1', patientId: 'p1', date: '2026-07-01',
    prediction: 'Otitis Media', confidence: 0.94, severity: 'Moderate',
    heatmapIntensity: 0.8, suggestedAction: 'Antibiotic therapy recommended',
    alternativeDiagnoses: [
      { label: 'External Ear Infection', confidence: 0.04 },
      { label: 'Normal Ear', confidence: 0.02 },
    ],
  },
  {
    id: 'ai2', imageId: 'img2', patientId: 'p2', date: '2026-06-28',
    prediction: 'Ear Wax', confidence: 0.97, severity: 'Mild',
    heatmapIntensity: 0.5, suggestedAction: 'Ear irrigation or softening drops',
    alternativeDiagnoses: [
      { label: 'Normal Ear', confidence: 0.02 },
      { label: 'External Ear Infection', confidence: 0.01 },
    ],
  },
];

export const mockNotifications = [
  { id: 'n1', type: 'appointment', title: 'Appointment Reminder', message: 'You have an appointment with Dr. Sarah Jenkins tomorrow at 10:00 AM', time: '2h ago', read: false },
  { id: 'n2', type: 'report', title: 'New Report Available', message: 'Your lab report from July 1st is now ready', time: '1d ago', read: false },
  { id: 'n3', type: 'prescription', title: 'Prescription Updated', message: 'Dr. Sarah Jenkins has updated your prescription', time: '2d ago', read: true },
  { id: 'n4', type: 'message', title: 'Message from Doctor', message: 'Please complete your antibiotic course and avoid water in the ear', time: '3d ago', read: true },
  { id: 'n5', type: 'followup', title: 'Follow-up Reminder', message: 'Your follow-up visit is scheduled for July 8th', time: '5d ago', read: true },
];

export const mockMedicalHistory = {
  allergies: ['Penicillin', 'Sulfonamides'],
  medications: ['Vitamin D3 supplements', 'Cetirizine 10mg'],
  surgeries: [
    { procedure: 'Tonsillectomy', date: '2018-03-15', hospital: 'MediCore Hospital', surgeon: 'Dr. Sarah Jenkins' },
  ],
  familyHistory: ['Hypertension (Father)', 'Type 2 Diabetes (Mother)'],
  visits: [
    { date: '2026-07-01', reason: 'Ear pain and discharge', doctor: 'Dr. Sarah Jenkins', department: 'ent', diagnosis: 'Otitis Media' },
    { date: '2026-06-10', reason: 'Routine checkup', doctor: 'Dr. Arjun Mehta', department: 'cardiology', diagnosis: 'Hypertension' },
    { date: '2026-05-22', reason: 'Hearing difficulty', doctor: 'Dr. Sarah Jenkins', department: 'ent', diagnosis: 'Ear Wax' },
  ],
};

export const mockAnalytics = {
  monthlyConsultations: [
    { month: 'Jan', value: 142 }, { month: 'Feb', value: 158 }, { month: 'Mar', value: 165 },
    { month: 'Apr', value: 171 }, { month: 'May', value: 180 }, { month: 'Jun', value: 195 },
    { month: 'Jul', value: 208 },
  ],
  diseaseDistribution: [
    { name: 'Cardiology', value: 22, fill: '#ef4444' },
    { name: 'ENT', value: 18, fill: '#e64833' },
    { name: 'Orthopedics', value: 15, fill: '#f59e0b' },
    { name: 'Pediatrics', value: 14, fill: '#06b6d4' },
    { name: 'Neurology', value: 10, fill: '#8b5cf6' },
    { name: 'Other', value: 21, fill: '#0a0a0a' },
  ],
  revenue: [
    { month: 'Jan', value: 145000 }, { month: 'Feb', value: 162000 }, { month: 'Mar', value: 158000 },
    { month: 'Apr', value: 174000 }, { month: 'May', value: 181000 }, { month: 'Jun', value: 196000 },
    { month: 'Jul', value: 212000 },
  ],
  aiAccuracy: [
    { month: 'Jan', value: 89 }, { month: 'Feb', value: 91 }, { month: 'Mar', value: 92 },
    { month: 'Apr', value: 93 }, { month: 'May', value: 94 }, { month: 'Jun', value: 95 },
    { month: 'Jul', value: 96 },
  ],
  departmentRevenue: [
    { dept: 'Cardiology', value: 52000 }, { dept: 'ENT', value: 31000 }, { dept: 'Orthopedics', value: 28000 },
    { dept: 'Radiology', value: 45000 }, { dept: 'General', value: 35000 }, { dept: 'Others', value: 21000 },
  ],
};

export const mockDeviceStatus = {
  deviceName: 'MediCore ENT-Scope Pro v2',
  firmwareVersion: '2.4.1',
  esp32Status: 'online',
  stm32Status: 'online',
  batteryLevel: 84,
  temperature: 42,
  wifiSignal: -65,
  wifiSsid: 'MediCore-5G',
  bleStatus: 'connected',
  ledStatus: 'on',
  ledBrightness: 70,
  streamingStatus: 'active',
  cameraResolution: '1280x720',
  frameRate: 30,
  uptime: '2h 34m',
};

export const wards = [
  { id: 'w1', name: 'General Ward A', department: 'general', total: 20, occupied: 14, type: 'general' },
  { id: 'w2', name: 'ICU', department: 'general', total: 10, occupied: 8, type: 'icu' },
  { id: 'w3', name: 'Cardiology Ward', department: 'cardiology', total: 15, occupied: 9, type: 'general' },
  { id: 'w4', name: 'ENT Ward', department: 'ent', total: 12, occupied: 5, type: 'general' },
  { id: 'w5', name: 'Pediatrics Ward', department: 'pediatrics', total: 14, occupied: 7, type: 'general' },
  { id: 'w6', name: 'Emergency Ward', department: 'emergency', total: 12, occupied: 10, type: 'emergency' },
];

export const labTests = [
  { id: 'lt1', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 450, turnaround: '4 hrs', department: 'lab' },
  { id: 'lt2', name: 'Lipid Profile', category: 'Biochemistry', price: 650, turnaround: '6 hrs', department: 'lab' },
  { id: 'lt3', name: 'Chest X-Ray', category: 'Radiology', price: 800, turnaround: '2 hrs', department: 'radiology' },
  { id: 'lt4', name: 'ECG (12-lead)', category: 'Cardiology', price: 500, turnaround: '30 mins', department: 'cardiology' },
  { id: 'lt5', name: 'MRI Brain', category: 'Radiology', price: 6500, turnaround: '24 hrs', department: 'radiology' },
  { id: 'lt6', name: 'Thyroid Profile', category: 'Biochemistry', price: 700, turnaround: '6 hrs', department: 'lab' },
  { id: 'lt7', name: 'Urine Routine', category: 'Pathology', price: 250, turnaround: '3 hrs', department: 'lab' },
  { id: 'lt8', name: 'ENT Endoscopy', category: 'ENT', price: 1200, turnaround: '1 hr', department: 'ent' },
];

export const labOrders = [
  { id: 'lo1', patientId: 'p1', patientName: 'Arjun Sharma', testId: 'lt8', testName: 'ENT Endoscopy', orderedBy: 'Dr. Sarah Jenkins', date: '2026-07-01', status: 'completed', result: 'Otitis Media detected', priority: 'routine' },
  { id: 'lo2', patientId: 'p2', patientName: 'Priya Nair', testId: 'lt4', testName: 'ECG (12-lead)', orderedBy: 'Dr. Arjun Mehta', date: '2026-07-02', status: 'pending', result: null, priority: 'urgent' },
  { id: 'lo3', patientId: 'p5', patientName: 'Vikram Reddy', testId: 'lt3', testName: 'Chest X-Ray', orderedBy: 'Dr. Priya Nair', date: '2026-07-05', status: 'in-progress', result: null, priority: 'routine' },
];

export const pharmacyInventory = [
  { id: 'm1', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 240, unit: 'capsules', price: 8, threshold: 50, supplier: 'MediSupply Co.' },
  { id: 'm2', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 500, unit: 'tablets', price: 2, threshold: 100, supplier: 'PharmaCorp' },
  { id: 'm3', name: 'Amlodipine 5mg', category: 'Antihypertensive', stock: 180, unit: 'tablets', price: 5, threshold: 40, supplier: 'CardioPharm' },
  { id: 'm4', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 320, unit: 'tablets', price: 3, threshold: 60, supplier: 'AllergyFree Ltd' },
  { id: 'm5', name: 'Otoclean Ear Drops', category: 'ENT', stock: 45, unit: 'bottles', price: 85, threshold: 20, supplier: 'ENT Care' },
  { id: 'm6', name: 'Ibuprofen 400mg', category: 'NSAID', stock: 280, unit: 'tablets', price: 4, threshold: 50, supplier: 'PharmaCorp' },
  { id: 'm7', name: 'Insulin Glargine', category: 'Antidiabetic', stock: 35, unit: 'pens', price: 1200, threshold: 15, supplier: 'DiabetiCare' },
  { id: 'm8', name: 'Azithromycin 250mg', category: 'Antibiotic', stock: 150, unit: 'tablets', price: 12, threshold: 30, supplier: 'MediSupply Co.' },
];

export const prescriptions = [
  { id: 'rx1', patientId: 'p1', patientName: 'Arjun Sharma', doctorName: 'Dr. Sarah Jenkins', date: '2026-07-01', diagnosis: 'Acute Otitis Media', medicines: [{ name: 'Amoxicillin 500mg', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' }], status: 'dispensed' },
  { id: 'rx2', patientId: 'p2', patientName: 'Priya Nair', doctorName: 'Dr. Arjun Mehta', date: '2026-07-02', diagnosis: 'Hypertension Stage 1', medicines: [{ name: 'Amlodipine 5mg', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }], status: 'pending' },
];

export const bills = [
  { id: 'b1', patientId: 'p1', patientName: 'Arjun Sharma', date: '2026-07-01', items: [{ desc: 'ENT Consultation', amount: 800 }, { desc: 'ENT Endoscopy', amount: 1200 }, { desc: 'Amoxicillin 500mg x14', amount: 112 }], total: 2112, status: 'paid', paymentMethod: 'UPI' },
  { id: 'b2', patientId: 'p2', patientName: 'Priya Nair', date: '2026-07-02', items: [{ desc: 'Cardiology Consultation', amount: 1000 }, { desc: 'ECG', amount: 500 }], total: 1500, status: 'pending', paymentMethod: null },
  { id: 'b3', patientId: 'p3', patientName: 'Rahul Mehta', date: '2026-07-03', items: [{ desc: 'Orthopedics Consultation', amount: 900 }, { desc: 'X-Ray Tibia', amount: 600 }], total: 1500, status: 'pending', paymentMethod: null },
];

export const staff = [
  { id: 's1', name: 'Anita Desai', role: 'nurse', department: 'emergency', shift: 'Day', phone: '+91 90003 33333', status: 'on-duty' },
  { id: 's2', name: 'Rajesh Kumar', role: 'receptionist', department: 'general', shift: 'Day', phone: '+91 90004 44444', status: 'on-duty' },
  { id: 's3', name: 'Sunita Patel', role: 'pharmacist', department: 'pharmacy', shift: 'Day', phone: '+91 90005 55555', status: 'on-duty' },
  { id: 's4', name: 'Deepak Sharma', role: 'lab_tech', department: 'lab', shift: 'Night', phone: '+91 90006 66666', status: 'off-duty' },
];

export const diseases = ['Otitis Media', 'Ear Wax', 'Tympanic Membrane Perforation', 'Fungal Infection', 'External Ear Infection', 'Normal Ear', 'Needs Specialist Review'];
export const specialties = ['ENT Specialist', 'Cardiologist', 'Orthopedic Surgeon', 'Neurologist', 'Pediatrician', 'Gynecologist', 'General Physician', 'Radiologist'];
export const timeSlots = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM'];

export const aiModels = [
  { id: 'ent', name: 'ENT Endoscopy AI', accuracy: '94.2%', department: 'ent' },
  { id: 'cardio', name: 'ECG Arrhythmia AI', accuracy: '92.8%', department: 'cardiology' },
  { id: 'radio', name: 'Chest X-Ray AI', accuracy: '93.5%', department: 'radiology' },
  { id: 'ortho', name: 'Fracture Detection AI', accuracy: '91.4%', department: 'orthopedics' },
];
