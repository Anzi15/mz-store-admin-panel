import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline, MdOutlineDone } from 'react-icons/md';

const TailwindDialog = ({ title, text, actionBtnText, cancelBtnText, actionReturner, initialOpen, icon="error" }) => {
  return (
    <Dialog open={initialOpen} onClose={() => actionReturner("denied")} className="relative z-10 flex items-center justify-center">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center md:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${icon == "error" ?
                  "bg-red-100": icon == "warn" ? "bg-yellow-100": icon == "success" && "bg-green-100" } sm:mx-0 sm:h-10 sm:w-10`}>
                {
                  icon == "error" ?
                  <MdErrorOutline  aria-hidden="true" className="h-6 w-6 text-red-600" /> : icon == "warn" ? <IoWarningOutline aria-hidden="true" className="h-6 w-6 text-yellow-400" /> : icon == "success" && <MdOutlineDone  aria-hidden="true" className="h-6 w-6 text-green-600" /> 
                }
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => actionReturner("confirmed")}
                className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${icon == "error" ?
                  "bg-red-600 hover:bg-red-500": icon == "warn" ? "bg-yellow-400 hover:bg-yellow-200": icon == "success" && "bg-green-600 hover:bg-green-500" } `}
              >
                {actionBtnText}
              </button>
              <button
                type="button"
                onClick={() => actionReturner("denied")}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {cancelBtnText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TailwindDialog;
