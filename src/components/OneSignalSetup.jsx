import { useEffect } from "react";

const OneSignalSetup = () => {
  useEffect(() => {
    // Initialize OneSignal with your App ID
    if (window.OneSignal) {
      window.OneSignal.push(() => {
        window.OneSignal.init({
          appId: import.meta.env.VITE_ONE_SIGNAL_APP_ID,  // Replace with your OneSignal App ID
          notifyButton: {
            enable: true,  // Show notification button on the website
          },
        });

        // Request permission for notifications
        window.OneSignal.push(() => {
          window.OneSignal.isPushNotificationsEnabled((isEnabled) => {
            if (!isEnabled) {
              window.OneSignal.push(() => {
                window.OneSignal.showNativePrompt();  // Ask for permission to send notifications
              });
            }
          });
        });
      });
    }
  }, []);

  return null;
};

export default OneSignalSetup;
