import { Injectable } from 'angular2/core';

/**
 * A simple service to handle app-wide configurations. This is intended to
 * be exposed through an external configuration file at deployment time,
 * allowing for external overrides of the contained properties (such as the
 * PCI Wake server URL).
 */
@Injectable()
export class Config {
  public pciwakeHost: string = "http://localhost:8080";
  public pciwakeLoginPath: string = "/login";
}