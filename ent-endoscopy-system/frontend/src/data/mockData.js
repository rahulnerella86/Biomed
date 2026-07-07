// Mock data for the ENT Endoscopy Platform

export const mockPatients = [
  { id: 'p1', name: 'Arjun Sharma', age: 34, gender: 'Male', phone: '+91 98765 43210', email: 'arjun@email.com', bloodGroup: 'O+', lastVisit: '2026-07-01', condition: 'Otitis Media', avatar: 'AS' },
  { id: 'p2', name: 'Priya Nair', age: 28, gender: 'Female', phone: '+91 91234 56789', email: 'priya@email.com', bloodGroup: 'A+', lastVisit: '2026-06-28', condition: 'Ear Wax', avatar: 'PN' },
  { id: 'p3', name: 'Rahul Mehta', age: 45, gender: 'Male', phone: '+91 87654 32109', email: 'rahul@email.com', bloodGroup: 'B+', lastVisit: '2026-06-25', condition: 'Normal', avatar: 'RM' },
  { id: 'p4', name: 'Sneha Iyer', age: 32, gender: 'Female', phone: '+91 94321 09876', email: 'sneha@email.com', bloodGroup: 'AB+', lastVisit: '2026-07-03', condition: 'Perforated Eardrum', avatar: 'SI' },
  { id: 'p5', name: 'Vikram Reddy', age: 52, gender: 'Male', phone: '+91 99876 54321', email: 'vikram@email.com', bloodGroup: 'O-', lastVisit: '2026-07-05', condition: 'Fungal Infection', avatar: 'VR' },
  { id: 'p6', name: 'Kavitha Krishnan', age: 41, gender: 'Female', phone: '+91 88765 43210', email: 'kavitha@email.com', bloodGroup: 'A-', lastVisit: '2026-06-30', condition: 'External Ear Infection', avatar: 'KK' },
];

export const mockDoctors = [
  { id: 'd1', name: 'Dr. Sarah Jenkins', specialty: 'ENT Specialist', hospital: 'Apollo Hospital', rating: 4.9, consultations: 1284, avatar: 'SJ', status: 'approved', license: 'MCI-2019-ENT-4521', experience: 12 },
  { id: 'd2', name: 'Dr. Ramesh Kumar', specialty: 'Otolaryngologist', hospital: 'AIIMS Delhi', rating: 4.8, consultations: 956, avatar: 'RK', status: 'approved', license: 'MCI-2016-OTO-3312', experience: 15 },
  { id: 'd3', name: 'Dr. Meena Pillai', specialty: 'Head & Neck Surgeon', hospital: 'Fortis Hospital', rating: 4.7, consultations: 742, avatar: 'MP', status: 'pending', license: 'MCI-2021-HNS-6621', experience: 8 },
];

export const mockAppointments = [
  { id: 'a1', patientId: 'p1', patientName: 'Arjun Sharma', doctorId: 'd1', doctorName: 'Dr. Sarah Jenkins', date: '2026-07-08', time: '10:00 AM', type: 'Teleconsult', status: 'confirmed', reason: 'Follow-up for Otitis Media' },
  { id: 'a2', patientId: 'p2', patientName: 'Priya Nair', doctorId: 'd1', doctorName: 'Dr. Sarah Jenkins', date: '2026-07-08', time: '11:30 AM', type: 'In-Person', status: 'waiting', reason: 'Ear Wax Removal' },
  { id: 'a3', patientId: 'p3', patientName: 'Rahul Mehta', doctorId: 'd2', doctorName: 'Dr. Ramesh Kumar', date: '2026-07-08', time: '02:00 PM', type: 'Teleconsult', status: 'confirmed', reason: 'Routine Checkup' },
  { id: 'a4', patientId: 'p4', patientName: 'Sneha Iyer', doctorId: 'd1', doctorName: 'Dr. Sarah Jenkins', date: '2026-07-09', time: '09:30 AM', type: 'In-Person', status: 'confirmed', reason: 'Eardrum Perforation Review' },
  { id: 'a5', patientId: 'p5', patientName: 'Vikram Reddy', doctorId: 'd2', doctorName: 'Dr. Ramesh Kumar', date: '2026-07-09', time: '03:30 PM', type: 'Teleconsult', status: 'pending', reason: 'Fungal Infection Treatment' },
];

export const mockReports = [
  {
    id: 'r1', patientId: 'p1', date: '2026-07-01', doctorName: 'Dr. Sarah Jenkins',
    diagnosis: 'Acute Otitis Media', aiResult: { label: 'Otitis Media', confidence: 0.94, severity: 'Moderate' },
    medicines: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed', duration: '5 days' },
    ],
    remarks: 'Middle ear infection. Complete the antibiotic course. Follow-up in 1 week.',
    followUp: '2026-07-08',
  },
  {
    id: 'r2', patientId: 'p2', date: '2026-06-28', doctorName: 'Dr. Sarah Jenkins',
    diagnosis: 'Cerumen Impaction', aiResult: { label: 'Ear Wax', confidence: 0.97, severity: 'Mild' },
    medicines: [
      { name: 'Otoclean Ear Drops', dosage: '3 drops', frequency: 'Three times daily', duration: '3 days' },
    ],
    remarks: 'Significant ear wax buildup. Irrigation performed. Use softening drops.',
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
  { id: 'n2', type: 'report', title: 'New Report Available', message: 'Your AI scan report from July 1st is now ready', time: '1d ago', read: false },
  { id: 'n3', type: 'prescription', title: 'Prescription Updated', message: 'Dr. Sarah Jenkins has updated your prescription', time: '2d ago', read: true },
  { id: 'n4', type: 'message', title: 'Message from Doctor', message: 'Please complete your antibiotic course and avoid water in the ear', time: '3d ago', read: true },
  { id: 'n5', type: 'followup', title: 'Follow-up Reminder', message: 'Your follow-up visit is scheduled for July 8th', time: '5d ago', read: true },
];

export const mockMedicalHistory = {
  allergies: ['Penicillin', 'Sulfonamides'],
  medications: ['Vitamin D3 supplements', 'Cetirizine 10mg'],
  surgeries: [
    { procedure: 'Tonsillectomy', date: '2018-03-15', hospital: 'Apollo Hospital', surgeon: 'Dr. Ramesh Kumar' },
  ],
  familyHistory: ['Hypertension (Father)', 'Type 2 Diabetes (Mother)'],
  visits: [
    { date: '2026-07-01', reason: 'Ear pain and discharge', doctor: 'Dr. Sarah Jenkins', diagnosis: 'Otitis Media' },
    { date: '2026-06-10', reason: 'Routine ENT checkup', doctor: 'Dr. Ramesh Kumar', diagnosis: 'Normal' },
    { date: '2026-05-22', reason: 'Hearing difficulty', doctor: 'Dr. Sarah Jenkins', diagnosis: 'Ear Wax' },
  ],
};

export const mockAnalytics = {
  monthlyConsultations: [
    { month: 'Jan', value: 42 }, { month: 'Feb', value: 58 }, { month: 'Mar', value: 65 },
    { month: 'Apr', value: 71 }, { month: 'May', value: 80 }, { month: 'Jun', value: 95 },
    { month: 'Jul', value: 108 },
  ],
  diseaseDistribution: [
    { name: 'Otitis Media', value: 32, fill: '#3b82f6' },
    { name: 'Ear Wax', value: 24, fill: '#14b8a6' },
    { name: 'Normal', value: 18, fill: '#10b981' },
    { name: 'Perforation', value: 12, fill: '#f59e0b' },
    { name: 'Fungal', value: 8, fill: '#8b5cf6' },
    { name: 'Other', value: 6, fill: '#ef4444' },
  ],
  revenue: [
    { month: 'Jan', value: 45000 }, { month: 'Feb', value: 62000 }, { month: 'Mar', value: 58000 },
    { month: 'Apr', value: 74000 }, { month: 'May', value: 81000 }, { month: 'Jun', value: 96000 },
    { month: 'Jul', value: 112000 },
  ],
  aiAccuracy: [
    { month: 'Jan', value: 89 }, { month: 'Feb', value: 91 }, { month: 'Mar', value: 92 },
    { month: 'Apr', value: 93 }, { month: 'May', value: 94 }, { month: 'Jun', value: 95 },
    { month: 'Jul', value: 96 },
  ],
};

export const mockDeviceStatus = {
  deviceName: 'ENT-Scope Pro v2',
  firmwareVersion: '2.4.1',
  esp32Status: 'online',
  stm32Status: 'online',
  batteryLevel: 84,
  temperature: 42,
  wifiSignal: -65,
  wifiSsid: 'MedNet-5G',
  bleStatus: 'connected',
  ledStatus: 'on',
  ledBrightness: 70,
  streamingStatus: 'active',
  cameraResolution: '1280x720',
  frameRate: 30,
  uptime: '2h 34m',
};

export const diseases = ['Otitis Media', 'Ear Wax', 'Tympanic Membrane Perforation', 'Fungal Infection', 'External Ear Infection', 'Normal Ear', 'Needs Specialist Review'];
export const specialties = ['ENT Specialist', 'Otolaryngologist', 'Head & Neck Surgeon', 'Audiologist', 'Pediatric ENT'];
export const timeSlots = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM'];
