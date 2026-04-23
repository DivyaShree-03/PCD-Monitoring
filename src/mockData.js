// Predefined faculty-student mapping
export const FACULTY_STUDENT_MAPPING = {
  "facultyA@svce.ac.in": ["stu1@svce.ac.in", "stu2@svce.ac.in", "stu3@svce.ac.in"],
  "facultyB@svce.ac.in": ["stu4@svce.ac.in", "stu5@svce.ac.in", "stu6@svce.ac.in"]
};

export const USERS = [
  // Faculty
  { id: "f1", email: "facultyA@svce.ac.in", password: "password123", role: "FACULTY", name: "Dr. Aris" },
  { id: "f2", email: "facultyB@svce.ac.in", password: "password123", role: "FACULTY", name: "Prof. Bob" },
  
  // Students
  { id: "stu1", email: "stu1@svce.ac.in", password: "password123", role: "STUDENT", name: "John Doe", roll: "21CS001" },
  { id: "stu2", email: "stu2@svce.ac.in", password: "password123", role: "STUDENT", name: "Jane Smith", roll: "21CS002" },
  { id: "stu3", email: "stu3@svce.ac.in", password: "password123", role: "STUDENT", name: "Alice Brown", roll: "21CS003" },
  { id: "stu4", email: "stu4@svce.ac.in", password: "password123", role: "STUDENT", name: "Bob Wilson", roll: "21CS004" },
  { id: "stu5", email: "stu5@svce.ac.in", password: "password123", role: "STUDENT", name: "Charlie Davis", roll: "21CS005" },
  { id: "stu6", email: "stu6@svce.ac.in", password: "password123", role: "STUDENT", name: "Diana Prince", roll: "21CS006" },
];

export const EVENTS = [
  { id: "e1", name: "Tech Symposium 2024", date: "2024-03-15", hours: 10, type: "Workshop" },
  { id: "e2", name: "Machine Learning Seminar", date: "2024-03-20", hours: 5, type: "Seminar" },
  { id: "e3", name: "Hackathon Q1", date: "2024-04-05", hours: 25, type: "Hackathon" },
  { id: "e4", name: "Cloud Computing Basics", date: "2024-04-10", hours: 8, type: "Course" },
  { id: "e5", name: "Soft Skills Workshop", date: "2024-04-15", hours: 6, type: "Workshop" },
  { id: "e6", name: "AI Ethics Panel", date: "2024-04-20", hours: 4, type: "Seminar" },
];

export const PARTICIPATION = [
  // Stu1: High progress (75 hours)
  { studentEmail: "stu1@svce.ac.in", eventId: "e1", hours: 10 },
  { studentEmail: "stu1@svce.ac.in", eventId: "e2", hours: 5 },
  { studentEmail: "stu1@svce.ac.in", eventId: "e3", hours: 25 },
  { studentEmail: "stu1@svce.ac.in", eventId: "e4", hours: 8 },
  { studentEmail: "stu1@svce.ac.in", eventId: "e5", hours: 6 },
  { studentEmail: "stu1@svce.ac.in", eventId: "e3", hours: 21 }, // Duplicate hackathon hours for demo

  // Stu2: Mid progress (30 hours)
  { studentEmail: "stu2@svce.ac.in", eventId: "e1", hours: 10 },
  { studentEmail: "stu2@svce.ac.in", eventId: "e3", hours: 20 },

  // Stu3: Low progress (defaulter) (5 hours)
  { studentEmail: "stu3@svce.ac.in", eventId: "e2", hours: 5 },

  // Stu4: Completed (80+ hours)
  { studentEmail: "stu4@svce.ac.in", eventId: "e3", hours: 50 },
  { studentEmail: "stu4@svce.ac.in", eventId: "e1", hours: 20 },
  { studentEmail: "stu4@svce.ac.in", eventId: "e4", hours: 15 },

  // Stu5: In progress
  { studentEmail: "stu5@svce.ac.in", eventId: "e5", hours: 6 },
  { studentEmail: "stu5@svce.ac.in", eventId: "e2", hours: 5 },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "New Event: IoT Workshop", message: "Enroll now for 12 PCD hours.", hours: 12 },
  { id: "n2", title: "Upcoming: Cybersecurity Seminar", message: "Gain 8 PCD hours next Friday.", hours: 8 },
];
