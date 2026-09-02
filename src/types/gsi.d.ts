declare global {
  interface PaystackPopInstance {
    newTransaction: (config: {
      key: string;
      email: string;
      amount: number;
      currency?: string;
      ref?: string;
      metadata?: {
        custom_fields?: Array<{
          display_name: string;
          variable_name: string;
          value: string;
        }>;
      };
      onSuccess?: (transaction: {
        reference: string;
        status: string;
        trans: string;
        transaction: string;
        message: string;
      }) => void;
      onCancel?: () => void;
      onClose?: () => void;
    }) => void;
  }

  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              shape?: string;
              width?: number;
              text?: string;
              locale?: string;
            },
          ) => void;
          prompt: () => void;
        };
      };
    };
    PaystackPop?: new () => PaystackPopInstance;
  }
}

export {};
