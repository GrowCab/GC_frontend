/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from "restful-react";
export const SPEC_VERSION = "v1"; 
export interface Error {
  /**
   * Errors
   */
  errors?: {[key: string]: any};
  /**
   * Error code
   */
  code?: number;
  /**
   * Error message
   */
  message?: string;
  /**
   * Error name
   */
  status?: string;
}

export interface PaginationMetadata {
  total?: number;
  total_pages?: number;
  first_page?: number;
  last_page?: number;
  page?: number;
  previous_page?: number;
  next_page?: number;
}

export interface ChamberSensor {
  sensor?: Sensor;
  sensor_id: number;
}

export interface Chamber {
  chamber_sensor?: ChamberSensor[];
  timestamp?: string | null;
  description: string;
  status: "POWER_OFF" | "RUNNING" | "REBOOT";
  id?: number;
}

export interface Sensor {
  description: string;
  chamber?: Chamber;
  hardware_classname: string;
  timestamp?: string | null;
}

export interface EditableSensor {
  description: string;
  chamber?: Chamber;
  hardware_classname: string;
  timestamp?: string | null;
}

export interface Unit {
  controllable?: boolean | null;
  label: string;
  id?: number;
  description: string;
  hardware_label: string;
}

export interface ExpectedMeasure {
  unit_id: number;
  end_hour: number;
  expected_value: number;
  unit?: Unit;
  end_minute: number;
  id?: number;
}

export interface Configuration {
  description: string;
  chamber_id: number;
  timestamp?: string | null;
  expected_measure?: ExpectedMeasure[];
  id?: number;
}

export interface EditableConfiguration {
  description: string;
  chamber_id: number;
  expected_measure?: ExpectedMeasure[];
}

export interface ChamberPowerStatus {
  status: "POWER_OFF" | "RUNNING" | "REBOOT";
}

export interface SensorUnit {
  max: number;
  unit?: Unit;
  min: number;
}

export interface Actuator {
  description: string;
  id?: number;
}

export interface ChamberActuator {
  actuator_id: number;
  actuator?: Actuator;
}

export interface ActuatorMeasure {
  current_value: number;
  chamber_actuator_id: number;
  chamber_actuator?: ChamberActuator;
}

export interface SensorMeasure {
  current_value: number;
  chamber_sensor?: ChamberSensor;
  sensor_unit_id: number;
  sensor_unit?: SensorUnit;
  chamber_sensor_id: number;
}

export interface MeasureGroup {
  actuator_measure?: ActuatorMeasure[];
  sensor_measure?: SensorMeasure[];
  timestamp?: string | null;
}

export interface ChamberStatus {
  data?: {
  [key: string]: {[key: string]: any};
};
}

export interface Measure {
  measure_group_id: number;
  current_value: number;
  sensor_unit_id: number;
  sensor_unit?: SensorUnit;
  chamber_sensor_id: number;
  id?: number;
}

export interface EditableSensorMeasure {
  current_value: number;
  chamber_sensor_id: number;
  sensor_unit_id: number;
}

export interface EditableActuatorMeasure {
  current_value: number;
  chamber_actuator_id: number;
}

export interface EditableMeasureGroup {
  sensor_measure?: EditableSensorMeasure[];
  actuator_measure?: EditableActuatorMeasure[];
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


export type PutSensorProps = Omit<MutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableSensor, void>, "path" | "verb">;

/**
 * Stores a new sensor
 * 
 * Each sensor contains an id, description and insertion timestamp
 */
export const PutSensor = (props: PutSensorProps) => (
  <Mutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableSensor, void>
    verb="PUT"
    path={`/api/sensors`}
    
    {...props}
  />
);

export type UsePutSensorProps = Omit<UseMutateProps<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableSensor, void>, "path" | "verb">;

/**
 * Stores a new sensor
 * 
 * Each sensor contains an id, description and insertion timestamp
 */
export const usePutSensor = (props: UsePutSensorProps) => useMutate<Sensor, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableSensor, void>("PUT", `/api/sensors`, props);


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


export type PutConfigurationProps = Omit<MutateProps<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableConfiguration, void>, "path" | "verb">;

/**
 * Stores a new configuration
 */
export const PutConfiguration = (props: PutConfigurationProps) => (
  <Mutate<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableConfiguration, void>
    verb="PUT"
    path={`/api/configurations`}
    
    {...props}
  />
);

export type UsePutConfigurationProps = Omit<UseMutateProps<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableConfiguration, void>, "path" | "verb">;

/**
 * Stores a new configuration
 */
export const usePutConfiguration = (props: UsePutConfigurationProps) => useMutate<Configuration, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableConfiguration, void>("PUT", `/api/configurations`, props);


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


export interface GetChamberScheduleUnitPathParams {
  chamber_id: number;
  unit_id: number
}

export type GetChamberScheduleUnitProps = Omit<GetProps<ExpectedMeasure[], DefaultErrorResponse, void, GetChamberScheduleUnitPathParams>, "path"> & GetChamberScheduleUnitPathParams;

export const GetChamberScheduleUnit = ({chamber_id, unit_id, ...props}: GetChamberScheduleUnitProps) => (
  <Get<ExpectedMeasure[], DefaultErrorResponse, void, GetChamberScheduleUnitPathParams>
    path={`/api/chamber_schedule_unit/${chamber_id}/${unit_id}`}
    
    {...props}
  />
);

export type UseGetChamberScheduleUnitProps = Omit<UseGetProps<ExpectedMeasure[], DefaultErrorResponse, void, GetChamberScheduleUnitPathParams>, "path"> & GetChamberScheduleUnitPathParams;

export const useGetChamberScheduleUnit = ({chamber_id, unit_id, ...props}: UseGetChamberScheduleUnitProps) => useGet<ExpectedMeasure[], DefaultErrorResponse, void, GetChamberScheduleUnitPathParams>((paramsInPath: GetChamberScheduleUnitPathParams) => `/api/chamber_schedule_unit/${paramsInPath.chamber_id}/${paramsInPath.unit_id}`, {  pathParams: { chamber_id, unit_id }, ...props });


export type GetChambersProps = Omit<GetProps<Chamber[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of configurations
 */
export const GetChambers = (props: GetChambersProps) => (
  <Get<Chamber[], DefaultErrorResponse, void, void>
    path={`/api/chambers`}
    
    {...props}
  />
);

export type UseGetChambersProps = Omit<UseGetProps<Chamber[], DefaultErrorResponse, void, void>, "path">;

/**
 * Get the list of configurations
 */
export const useGetChambers = (props: UseGetChambersProps) => useGet<Chamber[], DefaultErrorResponse, void, void>(`/api/chambers`, props);


export interface GetChamberPathParams {
  chamber_id: number
}

export type GetChamberProps = Omit<GetProps<Chamber, DefaultErrorResponse, void, GetChamberPathParams>, "path"> & GetChamberPathParams;

/**
 * Get the chamber and related objects
 * :param chamber_id: ID of the chamber
 * :return: Returns a Chamber object
 */
export const GetChamber = ({chamber_id, ...props}: GetChamberProps) => (
  <Get<Chamber, DefaultErrorResponse, void, GetChamberPathParams>
    path={`/api/chamber/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberProps = Omit<UseGetProps<Chamber, DefaultErrorResponse, void, GetChamberPathParams>, "path"> & GetChamberPathParams;

/**
 * Get the chamber and related objects
 * :param chamber_id: ID of the chamber
 * :return: Returns a Chamber object
 */
export const useGetChamber = ({chamber_id, ...props}: UseGetChamberProps) => useGet<Chamber, DefaultErrorResponse, void, GetChamberPathParams>((paramsInPath: GetChamberPathParams) => `/api/chamber/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface GetChamberPowerStatusPathParams {
  chamber_id: number
}

export type GetChamberPowerStatusProps = Omit<GetProps<ChamberPowerStatus, DefaultErrorResponse, void, GetChamberPowerStatusPathParams>, "path"> & GetChamberPowerStatusPathParams;

export const GetChamberPowerStatus = ({chamber_id, ...props}: GetChamberPowerStatusProps) => (
  <Get<ChamberPowerStatus, DefaultErrorResponse, void, GetChamberPowerStatusPathParams>
    path={`/api/chamber/power/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberPowerStatusProps = Omit<UseGetProps<ChamberPowerStatus, DefaultErrorResponse, void, GetChamberPowerStatusPathParams>, "path"> & GetChamberPowerStatusPathParams;

export const useGetChamberPowerStatus = ({chamber_id, ...props}: UseGetChamberPowerStatusProps) => useGet<ChamberPowerStatus, DefaultErrorResponse, void, GetChamberPowerStatusPathParams>((paramsInPath: GetChamberPowerStatusPathParams) => `/api/chamber/power/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface SetChamberPowerStatusPathParams {
  chamber_id: number
}

export type SetChamberPowerStatusProps = Omit<MutateProps<Chamber, UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberPowerStatus, SetChamberPowerStatusPathParams>, "path" | "verb"> & SetChamberPowerStatusPathParams;

export const SetChamberPowerStatus = ({chamber_id, ...props}: SetChamberPowerStatusProps) => (
  <Mutate<Chamber, UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberPowerStatus, SetChamberPowerStatusPathParams>
    verb="PUT"
    path={`/api/chamber/power/${chamber_id}`}
    
    {...props}
  />
);

export type UseSetChamberPowerStatusProps = Omit<UseMutateProps<Chamber, UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberPowerStatus, SetChamberPowerStatusPathParams>, "path" | "verb"> & SetChamberPowerStatusPathParams;

export const useSetChamberPowerStatus = ({chamber_id, ...props}: UseSetChamberPowerStatusProps) => useMutate<Chamber, UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberPowerStatus, SetChamberPowerStatusPathParams>("PUT", (paramsInPath: SetChamberPowerStatusPathParams) => `/api/chamber/power/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface GetChamberSensorsPathParams {
  chamber_id: number
}

export type GetChamberSensorsProps = Omit<GetProps<SensorUnit[], DefaultErrorResponse, void, GetChamberSensorsPathParams>, "path"> & GetChamberSensorsPathParams;

/**
 * Get the sensors for a chamber
 * :param chamber_id:
 * :return:
 */
export const GetChamberSensors = ({chamber_id, ...props}: GetChamberSensorsProps) => (
  <Get<SensorUnit[], DefaultErrorResponse, void, GetChamberSensorsPathParams>
    path={`/api/chamber_sensors/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberSensorsProps = Omit<UseGetProps<SensorUnit[], DefaultErrorResponse, void, GetChamberSensorsPathParams>, "path"> & GetChamberSensorsPathParams;

/**
 * Get the sensors for a chamber
 * :param chamber_id:
 * :return:
 */
export const useGetChamberSensors = ({chamber_id, ...props}: UseGetChamberSensorsProps) => useGet<SensorUnit[], DefaultErrorResponse, void, GetChamberSensorsPathParams>((paramsInPath: GetChamberSensorsPathParams) => `/api/chamber_sensors/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface GetChamberUnitsPathParams {
  chamber_id: number
}

export type GetChamberUnitsProps = Omit<GetProps<Unit[], DefaultErrorResponse, void, GetChamberUnitsPathParams>, "path"> & GetChamberUnitsPathParams;

/**
 * Get the units available for this chamber
 * 
 * This is useful for understanding which dials to present but also which values to use for filtering/separating
 * the ExpectedMeasure(s) of a Configuration for a Chamber
 * :param chamber_id: ID of the chamber
 * :return: Returns a list of Unit objects
 */
export const GetChamberUnits = ({chamber_id, ...props}: GetChamberUnitsProps) => (
  <Get<Unit[], DefaultErrorResponse, void, GetChamberUnitsPathParams>
    path={`/api/chamber_units/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberUnitsProps = Omit<UseGetProps<Unit[], DefaultErrorResponse, void, GetChamberUnitsPathParams>, "path"> & GetChamberUnitsPathParams;

/**
 * Get the units available for this chamber
 * 
 * This is useful for understanding which dials to present but also which values to use for filtering/separating
 * the ExpectedMeasure(s) of a Configuration for a Chamber
 * :param chamber_id: ID of the chamber
 * :return: Returns a list of Unit objects
 */
export const useGetChamberUnits = ({chamber_id, ...props}: UseGetChamberUnitsProps) => useGet<Unit[], DefaultErrorResponse, void, GetChamberUnitsPathParams>((paramsInPath: GetChamberUnitsPathParams) => `/api/chamber_units/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface GetChamberStatusPathParams {
  chamber_id: number
}

export type GetChamberStatusProps = Omit<GetProps<MeasureGroup, DefaultErrorResponse, void, GetChamberStatusPathParams>, "path"> & GetChamberStatusPathParams;

export const GetChamberStatus = ({chamber_id, ...props}: GetChamberStatusProps) => (
  <Get<MeasureGroup, DefaultErrorResponse, void, GetChamberStatusPathParams>
    path={`/api/chamber_status/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetChamberStatusProps = Omit<UseGetProps<MeasureGroup, DefaultErrorResponse, void, GetChamberStatusPathParams>, "path"> & GetChamberStatusPathParams;

export const useGetChamberStatus = ({chamber_id, ...props}: UseGetChamberStatusProps) => useGet<MeasureGroup, DefaultErrorResponse, void, GetChamberStatusPathParams>((paramsInPath: GetChamberStatusPathParams) => `/api/chamber_status/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface PutChamberStatusPathParams {
  chamber_id: number
}

export type PutChamberStatusProps = Omit<MutateProps<Measure[], UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberStatus, PutChamberStatusPathParams>, "path" | "verb"> & PutChamberStatusPathParams;

export const PutChamberStatus = ({chamber_id, ...props}: PutChamberStatusProps) => (
  <Mutate<Measure[], UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberStatus, PutChamberStatusPathParams>
    verb="PUT"
    path={`/api/chamber_status/${chamber_id}`}
    
    {...props}
  />
);

export type UsePutChamberStatusProps = Omit<UseMutateProps<Measure[], UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberStatus, PutChamberStatusPathParams>, "path" | "verb"> & PutChamberStatusPathParams;

export const usePutChamberStatus = ({chamber_id, ...props}: UsePutChamberStatusProps) => useMutate<Measure[], UnprocessableEntityResponse | DefaultErrorResponse, void, ChamberStatus, PutChamberStatusPathParams>("PUT", (paramsInPath: PutChamberStatusPathParams) => `/api/chamber_status/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export interface GetLatestMeasureGroupPathParams {
  chamber_id: number
}

export type GetLatestMeasureGroupProps = Omit<GetProps<MeasureGroup, DefaultErrorResponse, void, GetLatestMeasureGroupPathParams>, "path"> & GetLatestMeasureGroupPathParams;

export const GetLatestMeasureGroup = ({chamber_id, ...props}: GetLatestMeasureGroupProps) => (
  <Get<MeasureGroup, DefaultErrorResponse, void, GetLatestMeasureGroupPathParams>
    path={`/api/measure_group/${chamber_id}`}
    
    {...props}
  />
);

export type UseGetLatestMeasureGroupProps = Omit<UseGetProps<MeasureGroup, DefaultErrorResponse, void, GetLatestMeasureGroupPathParams>, "path"> & GetLatestMeasureGroupPathParams;

export const useGetLatestMeasureGroup = ({chamber_id, ...props}: UseGetLatestMeasureGroupProps) => useGet<MeasureGroup, DefaultErrorResponse, void, GetLatestMeasureGroupPathParams>((paramsInPath: GetLatestMeasureGroupPathParams) => `/api/measure_group/${paramsInPath.chamber_id}`, {  pathParams: { chamber_id }, ...props });


export type PutLatestMeasureGroupProps = Omit<MutateProps<MeasureGroup, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableMeasureGroup, void>, "path" | "verb">;

export const PutLatestMeasureGroup = (props: PutLatestMeasureGroupProps) => (
  <Mutate<MeasureGroup, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableMeasureGroup, void>
    verb="PUT"
    path={`/api/measure_group`}
    
    {...props}
  />
);

export type UsePutLatestMeasureGroupProps = Omit<UseMutateProps<MeasureGroup, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableMeasureGroup, void>, "path" | "verb">;

export const usePutLatestMeasureGroup = (props: UsePutLatestMeasureGroupProps) => useMutate<MeasureGroup, UnprocessableEntityResponse | DefaultErrorResponse, void, EditableMeasureGroup, void>("PUT", `/api/measure_group`, props);

