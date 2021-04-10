/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from "restful-react";
export const SPEC_VERSION = "v1"; 
export interface Chamber {
  timestamp?: string | null;
  id?: number;
  description: string;
}

export interface Sensor {
  chamber?: Chamber;
  timestamp?: string | null;
  id?: number;
  description: string;
}

export interface Sensor1 {
  chamber?: Chamber;
  timestamp?: string | null;
  id?: number;
  description?: string;
}

export interface Error {
  /**
   * Error message
   */
  message?: string;
  /**
   * Errors
   */
  errors?: {[key: string]: any};
  /**
   * Error code
   */
  code?: number;
  /**
   * Error name
   */
  status?: string;
}

export interface Unit {
  id?: number;
  description: string;
}

export interface ExpectedMeasure {
  unit?: Unit;
  expected_value: number;
  id?: number;
  unit_id?: number | null;
  configuration_id?: number | null;
  end_minute: number;
  end_hour: number;
}

export interface Configuration {
  id?: number;
  timestamp?: string | null;
  expected_measure?: ExpectedMeasure[];
  description: string;
  chamber_id?: number | null;
}

export interface Configuration1 {
  id?: number;
  timestamp?: string | null;
  expected_measure?: ExpectedMeasure[];
  description?: string;
  chamber_id?: number | null;
}

/**
 * Default error response
 */
export type DefaultErrorResponse = Error;

/**
 * Unprocessable Entity
 */
export type UnprocessableEntityResponse = Error;

export type GetSensorsProps = Omit<GetProps<Sensor[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of sensors
 */
export const GetSensors = (props: GetSensorsProps) => (
  <Get<Sensor[], DefaultErrorResponse, void, void>
    path={`/api/sensors`}
    
    {...props}
  />
);

export type UseGetSensorsProps = Omit<UseGetProps<Sensor[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of sensors
 */
export const useGetSensors = (props: UseGetSensorsProps) => useGet<Sensor[], DefaultErrorResponse, void, void>(`/api/sensors`, props);


export type PutSensorProps = Omit<MutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor1, void>, "path" | "verb">;

/**
 * Stores a new sensor
 * 
 * Each sensor contains an id, description and insertion timestamp
 */
export const PutSensor = (props: PutSensorProps) => (
  <Mutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor1, void>
    verb="PUT"
    path={`/api/sensors`}
    
    {...props}
  />
);

export type UsePutSensorProps = Omit<UseMutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor1, void>, "path" | "verb">;

/**
 * Stores a new sensor
 * 
 * Each sensor contains an id, description and insertion timestamp
 */
export const usePutSensor = (props: UsePutSensorProps) => useMutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor1, void>("PUT", `/api/sensors`, props);


export type GetConfigurationsProps = Omit<GetProps<Configuration[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of configurations
 */
export const GetConfigurations = (props: GetConfigurationsProps) => (
  <Get<Configuration[], DefaultErrorResponse, void, void>
    path={`/api/configurations`}
    
    {...props}
  />
);

export type UseGetConfigurationsProps = Omit<UseGetProps<Configuration[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of configurations
 */
export const useGetConfigurations = (props: UseGetConfigurationsProps) => useGet<Configuration[], DefaultErrorResponse, void, void>(`/api/configurations`, props);


export type PutConfigurationProps = Omit<MutateProps<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, Configuration1, void>, "path" | "verb">;

/**
 * Stores a new configuration
 */
export const PutConfiguration = (props: PutConfigurationProps) => (
  <Mutate<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, Configuration1, void>
    verb="PUT"
    path={`/api/configurations`}
    
    {...props}
  />
);

export type UsePutConfigurationProps = Omit<UseMutateProps<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, Configuration1, void>, "path" | "verb">;

/**
 * Stores a new configuration
 */
export const usePutConfiguration = (props: UsePutConfigurationProps) => useMutate<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, Configuration1, void>("PUT", `/api/configurations`, props);


export interface GetSensorPathParams {
  sensor_id: number
}

export type GetSensorProps = Omit<GetProps<Sensor, DefaultErrorResponse, void, GetSensorPathParams>, "path"> & GetSensorPathParams;

export const GetSensor = ({sensor_id, ...props}: GetSensorProps) => (
  <Get<Sensor, DefaultErrorResponse, void, GetSensorPathParams>
    path={`/api/sensor/${sensor_id}`}
    
    {...props}
  />
);

export type UseGetSensorProps = Omit<UseGetProps<Sensor, DefaultErrorResponse, void, GetSensorPathParams>, "path"> & GetSensorPathParams;

export const useGetSensor = ({sensor_id, ...props}: UseGetSensorProps) => useGet<Sensor, DefaultErrorResponse, void, GetSensorPathParams>((paramsInPath: GetSensorPathParams) => `/api/sensor/${paramsInPath.sensor_id}`, {  pathParams: { sensor_id }, ...props });


export interface PatchSensorPathParams {
  sensor_id: number
}

export type PatchSensorProps = Omit<MutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor, PatchSensorPathParams>, "path" | "verb"> & PatchSensorPathParams;

export const PatchSensor = ({sensor_id, ...props}: PatchSensorProps) => (
  <Mutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor, PatchSensorPathParams>
    verb="PATCH"
    path={`/api/sensor/${sensor_id}`}
    
    {...props}
  />
);

export type UsePatchSensorProps = Omit<UseMutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor, PatchSensorPathParams>, "path" | "verb"> & PatchSensorPathParams;

export const usePatchSensor = ({sensor_id, ...props}: UsePatchSensorProps) => useMutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, Sensor, PatchSensorPathParams>("PATCH", (paramsInPath: PatchSensorPathParams) => `/api/sensor/${paramsInPath.sensor_id}`, {  pathParams: { sensor_id }, ...props });


export type DeleteSensorProps = Omit<MutateProps<void, DefaultErrorResponse, void, string, void>, "path" | "verb">;

export const DeleteSensor = (props: DeleteSensorProps) => (
  <Mutate<void, DefaultErrorResponse, void, string, void>
    verb="DELETE"
    path={`/api/sensor`}
    
    {...props}
  />
);

export type UseDeleteSensorProps = Omit<UseMutateProps<void, DefaultErrorResponse, void, string, void>, "path" | "verb">;

export const useDeleteSensor = (props: UseDeleteSensorProps) => useMutate<void, DefaultErrorResponse, void, string, void>("DELETE", `/api/sensor`, {   ...props });


export interface GetChamberSchedulePathParams {
  chamber_id: number
}

export type GetChamberScheduleProps = Omit<GetProps<Configuration, DefaultErrorResponse, void, GetChamberSchedulePathParams>, "path"> & GetChamberSchedulePathParams;

export const GetChamberSchedule = ({chamber_id, ...props}: GetChamberScheduleProps) => (
  <Get<Configuration, DefaultErrorResponse, void, GetChamberSchedulePathParams>
    path={`/api/chamber_schedule/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberScheduleProps = Omit<UseGetProps<Configuration, DefaultErrorResponse, void, GetChamberSchedulePathParams>, "path"> & GetChamberSchedulePathParams;

export const useGetChamberSchedule = ({chamber_id, ...props}: UseGetChamberScheduleProps) => useGet<Configuration, DefaultErrorResponse, void, GetChamberSchedulePathParams>((paramsInPath: GetChamberSchedulePathParams) => `/api/chamber_schedule/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });

