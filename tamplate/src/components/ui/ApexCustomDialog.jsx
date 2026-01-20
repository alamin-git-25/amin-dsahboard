export const ApexCustomDialog = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white border p-6 -xl shadow-2xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-6">{message}</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-medium  hover:bg-gray-300 transition duration-150"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white font-medium  hover:bg-red-700 transition duration-150"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
);