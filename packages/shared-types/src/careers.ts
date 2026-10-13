export interface Job {
  id: string;
  title: string;
  location?: string;
}

export interface JobApplication {
  jobId: string;
  fullName: string;
  email: string;
}
