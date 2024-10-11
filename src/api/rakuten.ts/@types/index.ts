export type GolfCourseResponse = {
  count?: number | undefined;
  page?: number | undefined;
  first?: number | undefined;
  last?: number | undefined;
  hits?: number | undefined;
  carrier?: number | undefined;
  pageCount?: number | undefined;
  Items?: GolfCourse[] | undefined;
};

export type GolfCourse = {
  golfCourseId?: string | undefined;
  golfCourseName?: string | undefined;
  golfCourseNameKana?: string | undefined;
  golfCourseCaption?: string | undefined;
  golfCourseDetailUrl?: string | undefined;
};
