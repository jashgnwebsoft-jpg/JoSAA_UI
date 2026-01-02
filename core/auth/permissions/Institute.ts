export interface UniversityPermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface InstitutePermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface DepartmentPermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  SelectDepartmentbyInstituteID: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface HolidayPermissions {
  Delete: boolean;
  Insert: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface LibraryWiseInstitutePermissions {
  Delete: boolean;
  Insert: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface ProgramPermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  OptionsByInstituteIDDepartmentID: boolean;
  Export: boolean;
}

export interface CoursePermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  OptionsByUniversityID: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface SpecializationPermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  SelectSpecializationbyCourseID: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
}

export interface LibraryPermissions {
  Delete: boolean;
  Insert: boolean;
  Options: boolean;
  List: boolean;
  Get: boolean;
  View: boolean;
  Update: boolean;
  Export: boolean;
  GetCirculationSettings: boolean;
  GetEmailSettings: boolean;
  GetFineSettings: boolean;
  GetGeneralSettings: boolean;
  GetHolidaySettings: boolean;
  GetReminderSettings: boolean;
  UpdateCirculationSettings: boolean;
  UpdateEmailSettings: boolean;
  UpdateFineSettings: boolean;
  UpdateGeneralSettings: boolean;
  UpdateHolidaySettings: boolean;
  UpdateReminderSettings: boolean;
}
