/**
 * Collect all native modules which could be usefull here
 */
import { NativeModules } from 'react-native';

/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 */
export const Toast = NativeModules.ToastModule;
export const takePictureModule = NativeModules.TakePictureModule;