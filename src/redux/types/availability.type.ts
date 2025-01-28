export type Availability = {
  uuid?: string;
  startTime: Date;
  endTime: Date;
  userId?: number;
};

export type CreateAvailabilityData = Availability;

export type AvailabilityDataResponse = Availability;
