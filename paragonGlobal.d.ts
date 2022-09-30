/**
 * @src https://gist.github.com/ethanlee16/320cde5023a01140a9babd68c92f58bf
 */
declare global {
  var paragon: ConnectSDK;
}

declare type IntegrationWorkflowState = {
  enabled: boolean;
  settings: { [inputId: string]: string };
};

declare type IntegrationState = Partial<
  Record<
    string,
    {
      enabled: boolean;
      credentialId?: string;
      configuredWorkflows: {
        [workflowId: string]: IntegrationWorkflowState;
      };
    }
  >
>;

declare type ConnectUser =
  | {
      authenticated: false;
    }
  | AuthenticatedConnectUser;

declare type AuthenticatedConnectUser = {
  authenticated: true;
  token: string;
  userId: string;
  integrations: IntegrationState;
};

declare type IntegrationInstallEvent = {
  integrationId: string;
  integrationType: string;
};

declare type IntegrationUninstallEvent = {
  integrationId: string;
  integrationType: string;
};

declare type WorkflowStateChangeEvent = {
  integrationId: string;
  workflowId: string;
  workflowStateChange: Partial<IntegrationWorkflowState>;
};

declare type PortalOpenEvent = {
  integrationId: string;
  integrationType: string;
};

declare type PortalCloseEvent = {
  integrationId: string;
  integrationType: string;
};

declare type CallbackMap = {
  /**
   * @deprecated onSuccess has been replaced with onInstall
   */
  onSuccess?: (
    event: IntegrationInstallEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onError?: (err: Error) => void;
  onInstall?: (
    event: IntegrationInstallEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onUninstall?: (
    event: IntegrationUninstallEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onWorkflowChange?: (
    event: WorkflowStateChangeEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onOpen?: (event: PortalOpenEvent, user: AuthenticatedConnectUser) => void;
  onClose?: (event: PortalCloseEvent, user: AuthenticatedConnectUser) => void;
};

declare type SDKEventListenerMap = {
  onIntegrationInstall: (
    event: IntegrationInstallEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onIntegrationUninstall: (
    event: IntegrationUninstallEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onPortalClose: (
    event: PortalCloseEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onPortalOpen: (
    event: PortalOpenEvent,
    user: AuthenticatedConnectUser
  ) => void;
  onWorkflowChange: (
    event: WorkflowStateChangeEvent,
    user: AuthenticatedConnectUser
  ) => void;
};

declare type ListenerFunction<T extends keyof SDKEventListenerMap> =
  SDKEventListenerMap[T];

export interface IntegrationMetadata {
  type: string;
  name: string;
  icon: string;
  brandColor: string;
}

declare type InstallOptions = {
  showPortalAfterInstall: boolean;
};

export class ConnectSDK {
  /**
   * Authenticate your end user into the Paragon Connect SDK.
   *
   * @param projectId Your Paragon project ID.
   * @param token A JWT signed by your App Server. The JWT should include a user ID and a
   * session expiration time.
   */
  authenticate(projectId: string, token: string): Promise<void>;
  /**
   * Get the Paragon authentication and integration state of your end user.
   */
  getUser(): ConnectUser;
  /**
   * Logout the currently authenticated end user from the Paragon SDK.
   */
  logout(): void;
  /**
   * Display the Paragon Connect modal
   */
  connect(action: string, callbacks?: CallbackMap): Promise<void>;
  /*
   * Dispatch a Paragon event on behalf of the authenticated end user.
   */
  event(name: string, payload: Record<string, unknown>): Promise<void>;
  /**
   * Trigger a workflow by an ID. The workflow must use the Request trigger type.
   *
   * @param workflowId The ID of the Request-triggered workflow.
   * @param options Request options for triggering the workflow.
   */
  workflow(
    workflowId: string,
    options: {
      body?: RequestInit["body"] | object;
      headers?: RequestInit["headers"];
      query?: Record<string, string>;
    }
  ): Promise<object | undefined>;

  subscribe<T extends keyof SDKEventListenerMap>(
    eventName: T,
    listener: ListenerFunction<T>
  ): () => boolean;
  unsubscribe<T extends keyof SDKEventListenerMap>(
    eventName: T,
    listener: ListenerFunction<T>
  ): boolean;

  /**
   * Gets metadata for a specific integration by key name.
   * @param name
   */
  getIntegrationMetadata(name: string): IntegrationMetadata;
  /**
   * Get metadata for all integrations in the project.
   */
  getIntegrationMetadata(): IntegrationMetadata[];

  installIntegration(name: string, options?: InstallOptions): Promise<void>;
  uninstallIntegration(name: string): Promise<void>;
}
